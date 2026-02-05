<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    /**
     * Store an uploaded image for blog posts.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:2048', // 2MB max
        ]);

        // Generate a unique filename
        $originalName = $request->file('image')->getClientOriginalName();
        $slug = Str::slug(pathinfo($originalName, PATHINFO_FILENAME));
        $extension = $request->file('image')->extension();
        $filename = "{$slug}-".time().".{$extension}";

        // Store in blog/posts/images directory
        $path = $request->file('image')->storeAs(
            'blog/posts/images',
            $filename,
            'local'
        );

        // Return relative path for MDX frontmatter
        return response()->json([
            'path' => "images/{$filename}",
            'url' => Storage::disk('local')->url($path),
        ]);
    }
}
