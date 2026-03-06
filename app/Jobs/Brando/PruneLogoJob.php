<?php

namespace App\Jobs\Brando;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;

class PruneLogoJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly string $path,
        public readonly string $disk,
    ) {}

    public function handle(): void
    {
        Storage::disk($this->disk)->delete($this->path);
    }
}
