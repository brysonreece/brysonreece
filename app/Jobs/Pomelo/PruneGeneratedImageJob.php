<?php

namespace App\Jobs\Pomelo;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;

class PruneGeneratedImageJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly string $path) {}

    public function handle(): void
    {
        Storage::disk('public')->delete($this->path);
    }
}
