<?php

use App\Http\Controllers\Blog\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['local', 'auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    // Blog Post Routes
    Route::get('blog/posts', [PostController::class, 'index'])->name('blog.posts.index');
    Route::post('blog/posts', [PostController::class, 'store'])->name('blog.posts.store');
    Route::put('blog/posts/{post}', [PostController::class, 'update'])->name('blog.posts.update');
    Route::delete('blog/posts/{post}', [PostController::class, 'destroy'])->name('blog.posts.destroy');
});
