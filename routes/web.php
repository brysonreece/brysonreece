<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Uri;

// Extract the host from the application URL
$host = Uri::of(config('app.url'))->host();

Route::domain($host)
    ->group(__DIR__.'/web/guest.php')
    ->group(__DIR__.'/web/auth.php')
    ->group(__DIR__.'/web/app.php')
    ->group(__DIR__.'/web/settings.php');

Route::domain("emojicon.{$host}")
    ->get('/', fn () => redirect('https://emojicon.dev'))
    ->name('subdomains.emojicon');

Route::domain("links.{$host}")
    ->get('/', fn () => inertia('subdomains/links'))
    ->name('subdomains.links');
