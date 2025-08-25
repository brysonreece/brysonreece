<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Uri;

// Extract the host from the application URL
$host = Uri::of(config('app.url'))->host();

Route::domain($host)
    ->group(__DIR__.'/web/guest.php')
    ->group(__DIR__.'/web/auth.php')
    ->group(__DIR__.'/web/app.php')
    ->group(__DIR__.'/web/settings.php');

Route::domain("emojicon.dev")->group(function () {
    Route::get('/', fn () => inertia('subdomains/emojicons'))
        ->name('emojicon.welcome');

    Route::get('/{emoji}', fn (Request $request, string $emoji) => Response::make(
        view('emojicons.svg', ['emoji' => $emoji]),
        200,
        ['Content-Type' => 'image/svg+xml']
    ))->name('emojicon.svg');
});

Route::domain("emojicon.dev")
    ->get('/', fn () => redirect('https://emojicons.dev'))
    ->name('emojicon.dev');

Route::domain("emojicons.{$host}")->group(function () {
    Route::get('/', fn () => match (true) {
        app()->isProduction() => redirect('https://emojicons.dev'),
        default => inertia('subdomains/emojicons'),
    })->name('subdomains.emojicons');

    Route::get('/{emoji}', fn (Request $request, string $emoji) =>  match (true) {
        app()->isProduction() => redirect("https://emojicons.dev/{$emoji}"),
        default => Response::make(
            view('emojicons.svg', ['emoji' => $emoji]),
            200,
            ['Content-Type' => 'image/svg+xml']
        ),
    })->name('subdomains.emojicons.svg');
});

Route::domain("links.{$host}")
    ->get('/', fn () => inertia('subdomains/links'))
    ->name('subdomains.links');
