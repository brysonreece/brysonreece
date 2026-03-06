<?php

namespace App\Services\Pomelo;

use App\Jobs\Pomelo\GenerateImageVariationJob;
use Illuminate\Bus\Batch;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageVariationService
{
    private const TEMP_PATH = 'uploads';

    private const CACHE_TTL_MINUTES = 25;

    /**
     * Dispatch a batch of image variation jobs and return the batch ID.
     */
    private function disk(): string
    {
        return config('filesystems.pomelo_disk');
    }

    public function dispatch(UploadedFile $upload, ?string $prompt, int $count, string $quality = 'medium'): string
    {
        $disk = $this->disk();
        $tempPath = $this->storeTempUpload($upload, $disk);
        $absoluteTempPath = Storage::disk($disk)->path($tempPath);
        $fullPrompt = $this->buildPrompt($prompt);
        $batchId = Str::uuid()->toString();

        Cache::put(
            "pomelo:{$batchId}:total",
            $count,
            now()->addMinutes(self::CACHE_TTL_MINUTES),
        );

        $jobs = [];
        for ($i = 0; $i < $count; $i++) {
            $jobs[] = new GenerateImageVariationJob(
                cacheKey: $batchId,
                index: $i,
                absoluteTempPath: $absoluteTempPath,
                prompt: $fullPrompt,
                quality: $quality,
            );
        }

        Bus::batch($jobs)
            ->name("pomelo:{$batchId}")
            ->allowFailures()
            ->finally(function (Batch $batch) use ($disk, $tempPath): void {
                Storage::disk($disk)->delete($tempPath);
            })
            ->dispatch();

        return $batchId;
    }

    /**
     * Store the uploaded image to the local disk under a random filename.
     */
    private function storeTempUpload(UploadedFile $upload, string $disk): string
    {
        $extension = $upload->extension();
        $filename = Str::uuid()->toString().'.'.$extension;

        $upload->storeAs(self::TEMP_PATH, $filename, $disk);

        return self::TEMP_PATH.'/'.$filename;
    }

    /**
     * Build the final generation prompt, falling back to a sensible default.
     */
    private function buildPrompt(?string $userPrompt): string
    {
        $base = 'Generate a photorealistic product image variation that faithfully reproduces the exact same product from the reference image.';

        if (filled($userPrompt)) {
            return $base.' '.$userPrompt;
        }

        return $base;
    }
}
