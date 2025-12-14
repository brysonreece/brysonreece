<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_page_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('password.edit'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('settings/password'));
    }

    public function test_password_can_be_updated(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('current-password'),
        ]);

        $response = $this->actingAs($user)->put(route('password.update'), [
            'current_password' => 'current-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertValid();

        $this->assertTrue(Hash::check('new-password', $user->fresh()->password));
    }

    public function test_password_update_requires_current_password(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('current-password'),
        ]);

        $response = $this->actingAs($user)->put(route('password.update'), [
            'current_password' => 'wrong-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertInvalid(['current_password']);
    }

    public function test_password_update_requires_password_confirmation(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('current-password'),
        ]);

        $response = $this->actingAs($user)->put(route('password.update'), [
            'current_password' => 'current-password',
            'password' => 'new-password',
            'password_confirmation' => 'wrong-confirmation',
        ]);

        $response->assertInvalid(['password']);
    }

    public function test_password_must_be_at_least_8_characters(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('current-password'),
        ]);

        $response = $this->actingAs($user)->put(route('password.update'), [
            'current_password' => 'current-password',
            'password' => 'short',
            'password_confirmation' => 'short',
        ]);

        $response->assertInvalid(['password']);
    }
}
