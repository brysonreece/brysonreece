<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
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
        return Inertia::render('welcome', [
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
        return Inertia::render('guest/about');
    }

    /**
     * Show the career page for the application.
     *
     * @return \Inertia\Response
     */
    public function career(): Response
    {
        return Inertia::render('guest/event-list', [
            'title' => 'Career',
            'heading' => 'My Career Journey',
            'subtitle' => 'An epic tale filled with adventure, dragons, blood, sweat, and tears',
            'events' => array_map(function ($event) {
                $event['content'] = implode("\n", array_map((function ($line) {
                    return Str::after($line, '    ');
                }), explode("\n", $event['content'])));

                $logoUrl = secure_asset(
                    str_replace(public_path(), '', $event['logo_path']),
                );

                unset($event['logo_path']);

                return [
                    ...$event,
                    ...[
                        'type' => 'career',
                        'logoUrl' => $logoUrl,
                        'content' => Str::markdown($event['content']),
                    ],
                ];
            }, array_reverse(config('guest.career'))),
        ]);
    }

    /**
     * Show the projects page for the application.
     *
     * @return \Inertia\Response
     */
    public function projects(): Response
    {
        return Inertia::render('guest/projects', [
            'title' => 'Projects',
            'heading' => 'Projects & Prototypes',
            'subtitle' => 'The "5 to 9s" after the "9 to 5"',
            'events' => array_map(function ($event) {
                $event['content'] = str($event['content'])
                    ->replaceFirst('    ', '')
                    ->value();

                return [
                    ...$event,
                    ...[
                        'type' => 'project',
                        'content' => Str::markdown($event['content']),
                    ],
                ];
            }, array_reverse(config('guest.projects'))),
        ]);
    }

    /**
     * Show the community page for the application.
     *
     * @return \Inertia\Response
     */
    public function community(): Response
    {
        return Inertia::render('guest/event-list', [
            'title' => 'Community',
            'heading' => 'Talks & Workshops',
            'subtitle' => 'Efforts to give back to the communities that shaped me',
            'events' => array_map(function ($event) {
                $event['content'] = implode("\n", array_map((function ($line) {
                    return Str::after($line, '    ');
                }), explode("\n", $event['content'])));

                $logoUrl = secure_asset(
                    str_replace(public_path(), '', $event['logo_path']),
                );

                unset($event['logo_path']);

                return [
                    ...$event,
                    ...[
                        'type' => 'community',
                        'logoUrl' => $logoUrl,
                        'content' => Str::markdown($event['content']),
                    ],
                ];
            }, array_reverse(config('guest.community'))),
        ]);
    }

    /**
     * Show the uses page for the application.
     *
     * @return \Inertia\Response
     */
    public function uses(): Response
    {
        return Inertia::render('guest/uses');
    }
}
