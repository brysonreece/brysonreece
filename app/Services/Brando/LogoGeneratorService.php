<?php

namespace App\Services\Brando;

use App\Jobs\Brando\GenerateLogoJob;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class LogoGeneratorService
{
    private const CACHE_TTL_MINUTES = 25;

    public function dispatch(
        string $name,
        ?string $tagline,
        ?string $description,
        int $count,
        ?array $styles = null,
        string $quality = 'medium',
    ): string {
        $prompt = $this->buildPrompt($name, $tagline, $description, $styles);
        $batchId = Str::uuid()->toString();

        Cache::put(
            "brando:{$batchId}:total",
            $count,
            now()->addMinutes(self::CACHE_TTL_MINUTES),
        );

        Cache::put(
            "brando:{$batchId}:failed",
            0,
            now()->addMinutes(self::CACHE_TTL_MINUTES),
        );

        $jobs = [];
        for ($i = 0; $i < $count; $i++) {
            $jobs[] = new GenerateLogoJob(
                cacheKey: $batchId,
                index: $i,
                prompt: $prompt,
                quality: $quality,
            );
        }

        Bus::batch($jobs)
            ->name("brando:{$batchId}")
            ->allowFailures()
            ->dispatch();

        return $batchId;
    }

    /**
     * @param  array<string>|null  $styles
     */
    private function buildPrompt(string $name, ?string $tagline, ?string $description, ?array $styles): string
    {
        $prompt = "Create a professional logo for a brand called \"{$name}\".";

        if (filled($tagline)) {
            $prompt .= " Tagline: \"{$tagline}\".";
        }

        if (filled($description)) {
            $prompt .= " Brand description: {$description}.";
        }

        if (filled($styles)) {
            $prompt .= ' Visual style: '.implode(', ', $styles).'.';
        }

        $prompt .= ' The logo should be clean, modern, and work well at small sizes. Square format, white or minimal background, no text other than the brand name.';

        return $prompt;
    }
}
