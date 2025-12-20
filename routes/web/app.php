<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['local', 'auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
    Route::get('blog', fn () => Inertia::render('blog'))->name('blog');
});
