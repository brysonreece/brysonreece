<?php

namespace App\Services\Blog;

use App\Models\Blog\Post;
use DateTime;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostService
{
    public function all(array $filters = []): Collection
    {
        $posts = Cache::remember('posts.all', now()->addHours(24), function () {
            return $this->readAllPosts();
        });

        return $this->applyFilters($posts, $filters);
    }

    public function find(string $slug): ?Post
    {
        return Cache::remember("posts.{$slug}", now()->addHours(24), function () use ($slug) {
            return $this->readPost($slug);
        });
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

        // Clear cache
        $this->clearCache();

        // Return the created post by reading directly from filesystem (bypass cache)
        return $this->readPost($slug);
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
            Cache::forget("posts.{$oldId}");
        }

        // Clear cache
        $this->clearCache($newSlug);

        // Return the updated post by reading directly from filesystem (bypass cache)
        return $this->readPost($newSlug);
    }

    public function delete(Post $post): bool
    {
        $filePath = 'blog/posts/'.$post->id.'.mdx';

        if (Storage::disk('local')->exists($filePath)) {
            $result = Storage::disk('local')->delete($filePath);

            if ($result) {
                $this->clearCache($post->id);
            }

            return $result;
        }

        return false;
    }

    protected function clearCache(?string $slug = null): void
    {
        Cache::forget('posts.all');

        // Clear specific post cache if slug provided
        if ($slug) {
            Cache::forget("posts.{$slug}");
        }
    }

    protected function readAllPosts(): Collection
    {
        $files = Storage::disk('local')->files('blog/posts');

        return collect($files)
            ->filter(fn ($f) => str_ends_with($f, '.mdx'))
            ->map(fn ($f) => $this->readPost(basename($f, '.mdx')))
            ->filter()
            ->values();
    }

    protected function readPost(string $slug): ?Post
    {
        $path = "blog/posts/{$slug}.mdx";

        if (! Storage::disk('local')->exists($path)) {
            return null;
        }

        $content = Storage::disk('local')->get($path);
        $parsed = $this->parseMdxFile($content);

        return new Post(
            id: $slug,
            title: $parsed['title'] ?? 'Untitled',
            content: $parsed['content'] ?? '',
            description: $parsed['description'] ?? Str::limit(strip_tags($parsed['content'] ?? ''), 160),
            published_at: isset($parsed['published_at']) ? new DateTime($parsed['published_at']) : null,
            cover_image_url: $parsed['cover_image_url'] ?? null,
            preview_image_url: $parsed['preview_image_url'] ?? null,
            author: $parsed['author'] ?? null,
            tags: $parsed['tags'] ?? [],
            meta_title: $parsed['meta_title'] ?? $parsed['title'] ?? null,
            meta_description: $parsed['meta_description'] ?? null,
            created_at: isset($parsed['created_at']) ? new DateTime($parsed['created_at']) : new DateTime,
            updated_at: isset($parsed['updated_at']) ? new DateTime($parsed['updated_at']) : new DateTime,
        );
    }

    protected function parseMdxFile(string $content): array
    {
        $data = [];

        // Parse frontmatter (YAML between --- markers)
        if (preg_match('/^---\s*\n(.*?)\n---\s*\n(.*)$/s', $content, $matches)) {
            $frontmatter = $matches[1];
            $body = $matches[2];

            // Parse YAML-like frontmatter
            $lines = explode("\n", $frontmatter);
            foreach ($lines as $line) {
                if (str_contains($line, ':')) {
                    [$key, $value] = explode(':', $line, 2);
                    $key = trim($key);
                    $value = trim($value);

                    // Handle arrays (tags: [tag1, tag2] or tags: ["tag1", "tag2"])
                    if (str_starts_with($value, '[') && str_ends_with($value, ']')) {
                        $value = json_decode($value, true) ?? [];
                    }

                    // Remove quotes from strings (only if value is still a string)
                    if (is_string($value) &&
                        ((str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                        (str_starts_with($value, "'") && str_ends_with($value, "'")))) {
                        $value = substr($value, 1, -1);
                    }

                    $data[$key] = $value;
                }
            }

            $data['content'] = trim($body);
        } else {
            $data['content'] = $content;
        }

        return $data;
    }

    protected function applyFilters(Collection $posts, array $filters): Collection
    {
        // Status filter
        if (isset($filters['status'])) {
            $posts = $posts->filter(fn ($p) => $p->getStatus() === $filters['status']);
        }

        // Search filter
        if (isset($filters['search'])) {
            $search = strtolower($filters['search']);
            $posts = $posts->filter(function ($p) use ($search) {
                return str_contains(strtolower($p->title), $search)
                    || str_contains(strtolower($p->content), $search)
                    || str_contains(strtolower($p->description ?? ''), $search);
            });
        }

        // Tag filter
        if (isset($filters['tags'])) {
            $tags = is_array($filters['tags']) ? $filters['tags'] : [$filters['tags']];
            $posts = $posts->filter(function ($p) use ($tags) {
                return ! empty(array_intersect($tags, $p->tags));
            });
        }

        // Sorting
        $sortBy = $filters['sort_by'] ?? 'published_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';

        $posts = $posts->sortBy(function ($post) use ($sortBy) {
            return $post->$sortBy;
        }, SORT_REGULAR, $sortOrder === 'desc');

        return $posts->values();
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
