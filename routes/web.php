<?php

use App\Http\Controllers\GuestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(GuestController::class)->group(function () {
    Route::get('/', 'welcome')->name('guest.welcome');
    Route::get('about', 'about')->name('guest.about');
    Route::get('career', 'career')->name('guest.career');
    Route::get('projects', 'projects')->name('guest.projects');
    Route::get('community', 'community')->name('guest.community');
    Route::get('uses', 'uses')->name('guest.uses');
});

Route::middleware(['local', 'auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
