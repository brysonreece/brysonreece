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
    private const TEMP_DISK = 'local';

    private const TEMP_PATH = 'pomelo/uploads';

    private const CACHE_TTL_MINUTES = 25;

    /**
     * Dispatch a batch of image variation jobs and return the batch ID.
     */
    public function dispatch(UploadedFile $upload, ?string $prompt, int $count): string
    {
        $tempPath = $this->storeTempUpload($upload);
        $absoluteTempPath = Storage::disk(self::TEMP_DISK)->path($tempPath);
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
            );
        }

        Bus::batch($jobs)
            ->name("pomelo:{$batchId}")
            ->allowFailures()
            ->finally(function (Batch $batch) use ($tempPath): void {
                Storage::disk(self::TEMP_DISK)->delete($tempPath);
            })
            ->dispatch();

        return $batchId;
    }

    /**
     * Store the uploaded image to the local disk under a random filename.
     */
    private function storeTempUpload(UploadedFile $upload): string
    {
        $extension = $upload->extension();
        $filename = Str::uuid()->toString().'.'.$extension;

        $upload->storeAs(self::TEMP_PATH, $filename, self::TEMP_DISK);

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

        return $base.' Keep the same product, lighting, and composition as the reference.';
    }
}
