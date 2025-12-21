<?php

namespace App\Models\Blog;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Sushi\Sushi;

class Post extends Model
{
    use Sushi;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'title',
        'content',
        'description',
        'published_at',
        'cover_image_url',
        'preview_image_url',
        'author',
        'tags',
        'meta_title',
        'meta_description',
    ];

    protected $appends = ['status'];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'tags' => 'array',
        ];
    }

    public function sushiShouldCache()
    {
        return true;
    }

    public function getStatusAttribute(): string
    {
        if (! $this->published_at) {
            return 'draft';
        }

        if ($this->published_at->isFuture()) {
            return 'scheduled';
        }

        return 'published';
    }

    public function getPreviewImageUrlAttribute(): ?string
    {
        return $this->attributes['preview_image_url'] ?? $this->attributes['cover_image_url'] ?? null;
    }

    public function getRows()
    {
        $posts = [];
        $files = Storage::disk('local')->files('blog/posts');

        foreach ($files as $file) {
            if (! str_ends_with($file, '.mdx')) {
                continue;
            }

            $content = Storage::disk('local')->get($file);
            $parsed = $this->parseMdxFile($content);
            $slug = basename($file, '.mdx');

            $posts[] = [
                'id' => $slug,
                'title' => $parsed['title'] ?? 'Untitled',
                'description' => $parsed['description'] ?? Str::limit(strip_tags($parsed['content'] ?? ''), 160),
                'content' => $parsed['content'] ?? '',
                'published_at' => $parsed['published_at'] ?? null,
                'cover_image_url' => $parsed['cover_image_url'] ?? null,
                'preview_image_url' => $parsed['preview_image_url'] ?? null,
                'author' => $parsed['author'] ?? null,
                'tags' => json_encode($parsed['tags'] ?? []),
                'meta_title' => $parsed['meta_title'] ?? $parsed['title'] ?? null,
                'meta_description' => $parsed['meta_description'] ?? null,
                'created_at' => $parsed['created_at'] ?? now(),
                'updated_at' => $parsed['updated_at'] ?? now(),
            ];
        }

        return $posts;
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

                    // Handle arrays (tags: [tag1, tag2])
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

    public function getFilePath(): string
    {
        return 'blog/posts/'.$this->id.'.mdx';
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function scopeScheduled($query)
    {
        return $query->whereNotNull('published_at')
            ->where('published_at', '>', now());
    }

    public function scopeDraft($query)
    {
        return $query->whereNull('published_at');
    }
}
