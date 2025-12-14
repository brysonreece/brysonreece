<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_can_be_rendered(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('profile.edit'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('settings/profile'));
    }

    public function test_profile_information_can_be_updated(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->patch(route('profile.update'), [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);

        $response->assertValid();
        $response->assertRedirect(route('profile.edit'));

        $user->refresh();

        $this->assertSame('Updated Name', $user->name);
        $this->assertSame('updated@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_email_verification_status_is_unchanged_when_email_is_unchanged(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->patch(route('profile.update'), [
            'name' => 'Updated Name',
            'email' => $user->email,
        ]);

        $response->assertValid();

        $this->assertNotNull($user->fresh()->email_verified_at);
    }

    public function test_profile_update_requires_valid_email(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->patch(route('profile.update'), [
            'name' => 'Updated Name',
            'email' => 'not-an-email',
        ]);

        $response->assertInvalid(['email']);
    }

    public function test_profile_update_requires_unique_email(): void
    {
        User::factory()->create(['email' => 'existing@example.com']);

        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->patch(route('profile.update'), [
            'name' => 'Updated Name',
            'email' => 'existing@example.com',
        ]);

        $response->assertInvalid(['email']);
    }

    public function test_user_can_delete_their_account(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $response = $this->actingAs($user)->delete(route('profile.destroy'), [
            'password' => 'password',
        ]);

        $response->assertValid();
        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_account_deletion_requires_correct_password(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create([
            'password' => 'password',
        ]);

        $response = $this->actingAs($user)->delete(route('profile.destroy'), [
            'password' => 'wrong-password',
        ]);

        $response->assertInvalid(['password']);
        $this->assertNotNull($user->fresh());
    }
}
