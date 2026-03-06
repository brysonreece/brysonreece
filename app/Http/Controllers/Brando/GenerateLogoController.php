<?php

namespace App\Http\Controllers\Brando;

use App\Http\Controllers\Controller;
use App\Http\Requests\Brando\GenerateBrandLogoRequest;
use App\Services\Brando\LogoGeneratorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class GenerateLogoController extends Controller
{
    public function __construct(protected LogoGeneratorService $logoGeneratorService) {}

    /**
     * Dispatch a batch of logo generation jobs and return the batch ID.
     */
    public function __invoke(GenerateBrandLogoRequest $request): JsonResponse
    {
        $batchId = $this->logoGeneratorService->dispatch(
            name: $request->string('name')->trim()->value(),
            tagline: $request->string('tagline')->trim()->value() ?: null,
            description: $request->string('description')->trim()->value() ?: null,
            count: $request->integer('count'),
            styles: $request->collect('styles')->filter()->values()->all() ?: null,
            quality: $request->string('quality', 'medium')->value(),
        );

        return response()->json(['batchId' => $batchId], 202);
    }

    /**
     * Poll the status of a dispatched batch.
     */
    public function status(string $batchId): JsonResponse
    {
        $total = Cache::get("brando:{$batchId}:total");

        if ($total === null) {
            return response()->json(['status' => 'unknown'], 404);
        }

        $images = [];
        for ($i = 0; $i < $total; $i++) {
            $url = Cache::get("brando:{$batchId}:{$i}");
            if ($url !== null) {
                $images[] = ['url' => $url];
            }
        }

        $completed = count($images);
        $failed = (int) Cache::get("brando:{$batchId}:failed", 0);

        if ($completed + $failed === $total) {
            $status = $failed === $total ? 'failed' : 'complete';
        } else {
            $status = 'pending';
        }

        return response()->json([
            'status' => $status,
            'progress' => $completed,
            'total' => $total,
            'images' => $images,
        ]);
    }
}
