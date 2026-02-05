<?php

namespace App\Models\Blog;

use DateTimeInterface;

class Post
{
    public function __construct(
        public string $id,
        public string $title,
        public string $content,
        public ?string $description,
        public ?DateTimeInterface $published_at,
        public ?string $cover_image_url,
        public ?string $preview_image_url,
        public ?string $author,
        public array $tags,
        public ?string $meta_title,
        public ?string $meta_description,
        public DateTimeInterface $created_at,
        public DateTimeInterface $updated_at,
    ) {}

    public function getStatus(): string
    {
        if (! $this->published_at) {
            return 'draft';
        }

        if ($this->published_at > now()) {
            return 'scheduled';
        }

        return 'published';
    }

    public function getPreviewImageUrl(): ?string
    {
        return $this->preview_image_url ?? $this->cover_image_url;
    }

    public function getFilePath(): string
    {
        return 'blog/posts/'.$this->id.'.mdx';
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'description' => $this->description,
            'published_at' => $this->published_at?->format('c'),
            'cover_image_url' => $this->cover_image_url,
            'preview_image_url' => $this->preview_image_url,
            'author' => $this->author,
            'tags' => $this->tags,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'created_at' => $this->created_at->format('c'),
            'updated_at' => $this->updated_at->format('c'),
            'status' => $this->getStatus(),
        ];
    }
}
