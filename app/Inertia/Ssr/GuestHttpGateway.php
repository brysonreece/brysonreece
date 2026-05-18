<?php

namespace App\Inertia\Ssr;

use Illuminate\Http\Request;
use Illuminate\Routing\Route as RoutingRoute;
use Illuminate\Support\Facades\Route;
use Inertia\Ssr\HttpGateway;
use Inertia\Ssr\Response;

class GuestHttpGateway extends HttpGateway
{
    /**
     * Dispatch the Inertia page to the Server Side Rendering engine.
     */
    #[\Override]
    public function dispatch(array $page, ?Request $request = null): ?Response
    {
        if (isset($page['url']) && in_array($page['url'], $this->guestUrls())) {
            return parent::dispatch($page, $request);
        }

        return null;
    }

    /**
     * Get all of the URLs representing guest routes.
     *
     * @return array
     */
    public function guestUrls()
    {
        return collect(Route::getRoutes())
            ->filter(fn (RoutingRoute $route) => str($route->getName())->startsWith('guest.'))
            ->map(fn ($route) => str($route->uri)->start('/')->value())
            ->values()
            ->all();
    }
}
