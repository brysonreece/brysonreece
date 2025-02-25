<?php

use App\Http\Controllers\GuestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [GuestController::class, 'welcome'])->name('welcome');

foreach (['about', 'career', 'projects', 'community', 'uses'] as $page) {
    Route::get("/{$page}", [GuestController::class, $page])->name($page);
}

Route::middleware(['local', 'auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
