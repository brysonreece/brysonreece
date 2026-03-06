<?php

namespace App\Jobs\Brando;

use Illuminate\Bus\Batchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Ai\Image;

class GenerateLogoJob implements ShouldQueue
{
    use Batchable, Queueable;

    private const OUTPUT_PATH = 'generated';

    private const OUTPUT_TTL_MINUTES = 15;

    private const CACHE_TTL_MINUTES = 20;

    public function __construct(
        public readonly string $cacheKey,
        public readonly int $index,
        public readonly string $prompt,
        public readonly string $quality = 'medium',
    ) {}

    private function disk(): string
    {
        return config('filesystems.brando_disk');
    }

    public function handle(): void
    {
        if ($this->batch()?->cancelled()) {
            return;
        }

        $filename = Str::uuid()->toString().'.png';
        $outputPath = self::OUTPUT_PATH.'/'.$filename;

        $response = Image::of($this->prompt)
            ->quality($this->quality)
            ->square()
            ->generate();

        $response->storePubliclyAs(self::OUTPUT_PATH, $filename, $this->disk());

        /** @var \Illuminate\Filesystem\FilesystemAdapter $outputDisk */
        $outputDisk = Storage::disk($this->disk());

        $url = config('filesystems.disks.'.$this->disk().'.driver') === 'local'
            ? $outputDisk->url($outputPath)
            : $outputDisk->temporaryUrl($outputPath, now()->addMinutes(self::CACHE_TTL_MINUTES));

        Cache::put(
            "brando:{$this->cacheKey}:{$this->index}",
            $url,
            now()->addMinutes(self::CACHE_TTL_MINUTES),
        );

        PruneLogoJob::dispatch($outputPath, $this->disk())
            ->delay(now()->addMinutes(self::OUTPUT_TTL_MINUTES));
    }

    public function failed(\Throwable $exception): void
    {
        Cache::increment("brando:{$this->cacheKey}:failed");
    }
}
