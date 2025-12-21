<?php

namespace App\Services\Blog;

use App\Models\Blog\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostService
{
    public function index(array $filters = [])
    {
        $query = Post::query();

        if (isset($filters['status'])) {
            match ($filters['status']) {
                'draft' => $query->draft(),
                'scheduled' => $query->scheduled(),
                'published' => $query->published(),
                default => null,
            };
        }

        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (isset($filters['tags'])) {
            $tags = is_array($filters['tags']) ? $filters['tags'] : [$filters['tags']];
            foreach ($tags as $tag) {
                $query->whereJsonContains('tags', $tag);
            }
        }

        $sortBy = $filters['sort_by'] ?? 'published_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';

        return $query->orderBy($sortBy, $sortOrder)->get();
    }

    public function findBySlug(string $slug): ?Post
    {
        return Post::find($slug);
    }

    public function create(array $data): Post
    {
        // Slug is required and must be provided by the user
        $slug = $data['slug'];

        // Check if file already exists
        if (Storage::disk('local')->exists('blog/posts/'.$slug.'.mdx')) {
            throw new \InvalidArgumentException('A post with this slug already exists.');
        }

        // Set timestamps
        $data['created_at'] = now()->toIso8601String();
        $data['updated_at'] = now()->toIso8601String();

        // Write MDX file
        $this->writeMdxFile($slug, $data);

        // Return the created post
        return Post::find($slug);
    }

    public function update(Post $post, array $data): Post
    {
        // Get the old id (slug) to delete the old file if id changed
        $oldId = $post->id;

        // Merge existing post data with updates
        $postData = array_merge($post->toArray(), $data);

        // If slug is being updated, check if new slug is available
        if (isset($data['slug']) && $data['slug'] !== $oldId) {
            $newId = $data['slug'];
            if (Storage::disk('local')->exists('blog/posts/'.$newId.'.mdx')) {
                throw new \InvalidArgumentException('A post with this slug already exists.');
            }
            $newSlug = $newId;
        } else {
            $newSlug = $oldId;
        }

        // Update timestamp
        $postData['updated_at'] = now()->toIso8601String();

        // Write updated MDX file
        $this->writeMdxFile($newSlug, $postData);

        // Delete old file if slug changed
        if ($oldId !== $newSlug) {
            Storage::disk('local')->delete('blog/posts/'.$oldId.'.mdx');
        }

        // Return the updated post
        return Post::find($newSlug);
    }

    public function delete(Post $post): bool
    {
        $filePath = 'blog/posts/'.$post->id.'.mdx';

        if (Storage::disk('local')->exists($filePath)) {
            return Storage::disk('local')->delete($filePath);
        }

        return false;
    }

    protected function writeMdxFile(string $slug, array $data): void
    {
        $frontmatter = $this->generateFrontmatter($data);
        $content = $data['content'] ?? '';

        $mdxContent = "---\n{$frontmatter}\n---\n\n{$content}";

        $filePath = 'blog/posts/'.$slug.'.mdx';
        Storage::disk('local')->put($filePath, $mdxContent);
    }

    protected function generateFrontmatter(array $data): string
    {
        $frontmatter = [];

        $fields = [
            'title',
            'description',
            'published_at',
            'cover_image_url',
            'preview_image_url',
            'author',
            'tags',
            'meta_title',
            'meta_description',
            'created_at',
            'updated_at',
        ];

        foreach ($fields as $field) {
            if (isset($data[$field]) && $data[$field] !== null) {
                $value = $data[$field];

                // Format arrays as JSON
                if (is_array($value)) {
                    $value = json_encode($value);
                } else {
                    // Escape quotes in strings
                    $value = str_replace('"', '\"', $value);
                    $value = "\"{$value}\"";
                }

                $frontmatter[] = "{$field}: {$value}";
            }
        }

        return implode("\n", $frontmatter);
    }
}
