<?php

namespace Tests\Feature\Security;

use App\Listeners\StoreLoginRecords;
use App\Mail\NewLoginDevice;
use App\Models\User;
use App\Services\IpApiService;
use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use Mockery;
use Tests\TestCase;

class LoginTrackingTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_stores_last_login_timestamp(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'last_login_at' => null,
            'last_login_ip' => null,
        ]);

        $this->assertNull($user->last_login_at);

        $this->post(route('login'), [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $user->refresh();
        $this->assertNotNull($user->last_login_at);
    }

    public function test_login_stores_ip_address(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'last_login_at' => null,
            'last_login_ip' => null,
        ]);

        $this->assertNull($user->last_login_ip);

        $this->post(route('login'), [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $user->refresh();
        $this->assertNotNull($user->last_login_ip);
    }

    public function test_login_from_new_ip_sends_notification(): void
    {
        Mail::fake();

        // Mock IpApiService
        $this->mock(IpApiService::class, function ($mock) {
            $mock->shouldReceive('geolocate')
                ->once()
                ->andReturn([
                    'status' => 'success',
                    'country' => 'United States',
                    'city' => 'New York',
                    'query' => '192.168.1.2',
                ]);
        });

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'last_login_ip' => '192.168.1.1', // Previous IP
            'last_login_at' => now()->subDay(), // Previous login time
        ]);

        // Login with different IP
        $this->post(route('login'), [
            'email' => 'test@example.com',
            'password' => 'password',
        ], ['REMOTE_ADDR' => '192.168.1.2']);

        // The email is sent via defer(), so we need to trigger deferred callbacks
        // In testing, deferred callbacks execute immediately
        Mail::assertSent(NewLoginDevice::class, fn($mail) => $mail->hasTo($user->email));
    }

    public function test_login_from_same_ip_does_not_send_notification(): void
    {
        Mail::fake();

        User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'last_login_ip' => '127.0.0.1',
            'last_login_at' => now()->subDay(),
        ]);

        $this->post(route('login'), [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        Mail::assertNotSent(NewLoginDevice::class);
    }

    public function test_first_login_does_not_send_notification(): void
    {
        Mail::fake();

        User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'last_login_ip' => null,
            'last_login_at' => null,
        ]);

        $this->post(route('login'), [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        Mail::assertNotSent(NewLoginDevice::class);
    }

    public function test_store_login_records_listener_updates_user_fields(): void
    {
        Event::fake([Login::class]);

        $user = User::factory()->create([
            'last_login_at' => null,
            'last_login_ip' => null,
        ]);

        $listener = new StoreLoginRecords;
        $event = new Login('web', $user, false);

        $listener->handle($event);

        $user->refresh();

        $this->assertNotNull($user->last_login_at);
        $this->assertNotNull($user->last_login_ip);
    }

    public function test_store_login_records_listener_handles_non_user_authentication(): void
    {
        Event::fake([Login::class]);

        $listener = new StoreLoginRecords;

        // Create a mock authenticatable that isn't a User
        $guard = Mockery::mock(\Illuminate\Contracts\Auth\Authenticatable::class);

        $event = new Login('web', $guard, false);

        // This should not throw an exception
        $listener->handle($event);

        $this->assertTrue(true);
    }
}
