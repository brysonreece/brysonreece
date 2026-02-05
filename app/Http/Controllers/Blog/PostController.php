<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\StorePostRequest;
use App\Http\Requests\Blog\UpdatePostRequest;
use App\Http\Resources\Blog\PostCollection;
use App\Services\Blog\PostService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class PostController extends Controller
{
    public function __construct(
        protected PostService $postService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $filters = [
            'status' => $request->get('status'),
            'search' => $request->get('search'),
            'tags' => $request->get('tags'),
            'sort_by' => $request->get('sort_by', 'published_at'),
            'sort_order' => $request->get('sort_order', 'desc'),
        ];

        $posts = $this->postService->all($filters);

        return inertia('posts', [
            'posts' => new PostCollection($posts),
            'filters' => $filters,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $post = $this->postService->create($request->validated());

        return to_route('blog.posts.index')
            ->with('success', 'Post created successfully.')
            ->with('post', $post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $slug): RedirectResponse
    {
        $post = $this->postService->find($slug);

        if (! $post) {
            abort(404);
        }

        $updatedPost = $this->postService->update($post, $request->validated());

        return back()->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug): RedirectResponse
    {
        $post = $this->postService->find($slug);

        if (! $post) {
            abort(404);
        }

        $this->postService->delete($post);

        return to_route('blog.posts.index')
            ->with('success', 'Post deleted successfully.');
    }
}
