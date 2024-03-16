<?php

use App\Http\Controllers\GuestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

app()->environment('local')
    ? Route::redirect('/', '/login')->name('welcome')
    : Route::get('/', [GuestController::class, 'welcome'])->name('welcome');

foreach (['about', 'career', 'projects', 'community', 'uses'] as $page) {
    Route::get("/{$page}", [GuestController::class, $page])->name($page);
}

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
});
