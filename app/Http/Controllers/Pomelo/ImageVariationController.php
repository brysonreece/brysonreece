<?php

namespace App\Http\Controllers\Pomelo;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pomelo\GenerateImageVariationsRequest;
use App\Services\Pomelo\ImageVariationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ImageVariationController extends Controller
{
    public function __construct(protected ImageVariationService $imageVariationService) {}

    /**
     * Dispatch a batch of image variation jobs and return the batch ID.
     */
    public function store(GenerateImageVariationsRequest $request): JsonResponse
    {
        $batchId = $this->imageVariationService->dispatch(
            upload: $request->file('image'),
            prompt: $request->string('prompt')->trim()->value(),
            count: $request->integer('count'),
            quality: $request->string('quality')->value(),
        );

        return response()->json(['batchId' => $batchId], 202);
    }

    /**
     * Poll the status of a dispatched batch.
     */
    public function status(string $batchId): JsonResponse
    {
        $total = Cache::get("pomelo:{$batchId}:total");

        if ($total === null) {
            return response()->json(['status' => 'unknown'], 404);
        }

        $images = [];
        for ($i = 0; $i < $total; $i++) {
            $url = Cache::get("pomelo:{$batchId}:{$i}");
            if ($url !== null) {
                $images[] = ['url' => $url];
            }
        }

        $completed = count($images);
        $failed = (int) Cache::get("pomelo:{$batchId}:failed", 0);

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
