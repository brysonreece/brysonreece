<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class GuestController extends Controller
{
    /**
     * Show the welcome page for the application.
     *
     * @return \Inertia\Response
     */
    public function welcome(): Response
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    /**
     * Show the about page for the application.
     *
     * @return \Inertia\Response
     */
    public function about(): Response
    {
        return Inertia::render('Guest/About');
    }

    /**
     * Show the career page for the application.
     *
     * @return \Inertia\Response
     */
    public function career(): Response
    {
        return Inertia::render('Guest/Career');
    }

    /**
     * Show the projects page for the application.
     *
     * @return \Inertia\Response
     */
    public function projects(): Response
    {
        return Inertia::render('Guest/Projects');
    }

    /**
     * Show the community page for the application.
     *
     * @return \Inertia\Response
     */
    public function community(): Response
    {
        return Inertia::render('Guest/Community');
    }

    /**
     * Show the uses page for the application.
     *
     * @return \Inertia\Response
     */
    public function uses(): Response
    {
        return Inertia::render('Guest/Uses');
    }
}
