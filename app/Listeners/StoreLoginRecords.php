<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Login;

class StoreLoginRecords
{
    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Login  $event
     * @return void
     */
    public function handle(Login $event): void
    {
        if (! $event->user instanceof User) {
            return;
        }

        $event->user->forceFill([
            'last_login_at' => now(),
            'last_login_ip' => request()->getClientIp(),
        ])->save();
    }
}
