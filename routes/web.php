<?php

use App\Http\Controllers\Brando\GenerateBrandNamesController;
use App\Http\Controllers\Brando\GenerateLogoController;
use App\Http\Controllers\Pomelo\ImageVariationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Uri;

// Extract the host from the application URL
$host = Uri::of(config('app.url'))->host();

Route::domain($host)
    ->group(__DIR__.'/web/guest.php')
    ->group(__DIR__.'/web/auth.php')
    ->group(__DIR__.'/web/app.php')
    ->group(__DIR__.'/web/settings.php');

Route::domain("links.{$host}")
    ->get('/', fn () => inertia('subdomains/links'))
    ->name('subdomains.links');

Route::domain("recall.{$host}")
    ->get('/', fn () => inertia('subdomains/recall'))
    ->name('subdomains.recall');

Route::domain("pomelo.{$host}")->group(function () {
    Route::get('/', fn () => inertia('subdomains/pomelo'))->name('subdomains.pomelo');
    Route::post('/variations', [ImageVariationController::class, 'store'])->name('pomelo.variations.store');
    Route::get('/variations/{batchId}', [ImageVariationController::class, 'status'])->name('pomelo.variations.status');
});

Route::domain("brando.{$host}")->group(function () {
    Route::get('/', fn () => inertia('subdomains/brando'))->name('subdomains.brando');
    Route::post('/generations', GenerateBrandNamesController::class)->name('brando.generations.store');

    Route::post('/logo/generations', GenerateLogoController::class)->name('brando.logo.generations.store');
    Route::get('/logo/generations/{batchId}', [GenerateLogoController::class, 'status'])->name('brando.logo.generations.status');
});
