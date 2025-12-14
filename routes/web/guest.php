<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('welcome'))
    ->name('guest.welcome');

Route::get('about', fn () => inertia('guest/about'))
    ->name('guest.about');

Route::get('career', fn () => inertia('guest/career'))
    ->name('guest.career');

Route::get('projects', fn () => inertia('guest/projects'))
    ->name('guest.projects');

Route::get('community', fn () => inertia('guest/community'))
    ->name('guest.community');

Route::get('uses', fn () => inertia('guest/uses'))
    ->name('guest.uses');

Route::get('links', fn () => to_route('subdomains.links'))
    ->name('guest.links');
