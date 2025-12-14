<?php

namespace App\Listeners;

use App\Mail\NewLoginDevice;
use App\Models\User;
use App\Services\IpApiService;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Request;

class StoreLoginRecords
{
    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        if (! $event->user instanceof User) {
            return;
        }

        $previousLoginIp = $event->user->last_login_ip;
        $currentLoginIp = Request::getClientIp();

        $event->user->forceFill([
            'last_login_at' => now(),
            'last_login_ip' => $currentLoginIp,
        ])->save();

        // Send an email notification to the user if logging in from a new device
        if ($previousLoginIp && ($previousLoginIp !== $currentLoginIp)) {
            defer(fn () => $this->sendNewLoginDeviceNotification($event->user, $currentLoginIp));
        }
    }

    /**
     * Send an email notification to the user if logging in from a new device.
     *
     * @param  User  $user  The authenticated user.
     * @param  string  $currentLoginIp  The IP address of the current login.
     */
    protected function sendNewLoginDeviceNotification(User $user, string $currentLoginIp): void
    {
        $ipDetails = app(IpApiService::class)->geolocate($currentLoginIp);

        Mail::to($user)->send(new NewLoginDevice($ipDetails));
    }
}
