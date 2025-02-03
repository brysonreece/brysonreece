<?php

use App\Http\Controllers\GuestController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GuestController::class, 'welcome'])->name('welcome');

foreach (['about', 'career', 'projects', 'community', 'uses'] as $page) {
    Route::get("/{$page}", [GuestController::class, $page])->name($page);
}
