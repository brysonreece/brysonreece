<?php

declare(strict_types=1);

namespace App\Providers;

use App\Inertia\Ssr\GuestHttpGateway;
use Illuminate\Support\ServiceProvider;
use Inertia\Ssr\HttpGateway;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array<string, string>
     */
    public $bindings = [
        HttpGateway::class => GuestHttpGateway::class,
    ];

    /**
     * Register any application services.
     */
    #[\Override]
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
