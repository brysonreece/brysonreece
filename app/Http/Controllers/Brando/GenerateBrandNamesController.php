<?php

namespace App\Http\Controllers\Brando;

use App\Ai\Agents\Brando\BrandNameAgent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Brando\GenerateBrandNamesRequest;
use Illuminate\Http\JsonResponse;

class GenerateBrandNamesController extends Controller
{
    /**
     * Generate brand name suggestions from a brand description.
     */
    public function __invoke(GenerateBrandNamesRequest $request): JsonResponse
    {
        $description = $request->string('description')->trim()->value();
        $tones = $request->collect('tones')->implode(', ');

        $prompt = $tones
            ? "Brand description: {$description}\n\nPreferred tone(s): {$tones}"
            : "Brand description: {$description}";

        $response = (new BrandNameAgent)->prompt($prompt);

        return response()->json([
            'names' => $response['names'],
        ]);
    }
}
