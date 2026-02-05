<?php

namespace Tests\Feature\Blog;

use App\Models\User;
use App\Services\Blog\PostService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Use real storage, clean up test files
        $testPosts = Storage::disk('local')->files('blog/posts');
        foreach ($testPosts as $file) {
            if (str_contains($file, '-test') || str_contains($file, 'test-')) {
                Storage::disk('local')->delete($file);
            }
        }

        if (! Storage::disk('local')->exists('blog/posts')) {
            Storage::disk('local')->makeDirectory('blog/posts');
        }

        // Clear cache before each test
        Cache::forget('posts.all');
    }

    protected function tearDown(): void
    {
        // Clean up test posts
        $testPosts = Storage::disk('local')->files('blog/posts');
        foreach ($testPosts as $file) {
            if (str_contains($file, '-test') || str_contains($file, 'test-')) {
                Storage::disk('local')->delete($file);
            }
        }

        // Clear cache after each test
        Cache::forget('posts.all');

        parent::tearDown();
    }

    protected function createTestPost(array $data = []): void
    {
        $defaults = [
            'title' => 'Test Post',
            'content' => 'This is test content.',
            'description' => 'Test description',
            'published_at' => now()->toIso8601String(),
            'created_at' => now()->toIso8601String(),
            'updated_at' => now()->toIso8601String(),
        ];

        $postData = array_merge($defaults, $data);
        $slug = $data['slug'] ?? 'test-post';

        $frontmatter = [];
        foreach ($postData as $key => $value) {
            if ($key !== 'content' && $key !== 'slug' && $value !== null) {
                if (is_array($value)) {
                    $frontmatter[] = "{$key}: ".json_encode($value);
                } else {
                    $escapedValue = str_replace('"', '\"', $value);
                    $frontmatter[] = "{$key}: \"{$escapedValue}\"";
                }
            }
        }

        $mdxContent = "---\n".implode("\n", $frontmatter)."\n---\n\n".$postData['content'];
        Storage::disk('local')->put("blog/posts/{$slug}.mdx", $mdxContent);

        // Clear cache so new post is immediately available
        Cache::forget('posts.all');
    }

    public function test_index_page_can_be_rendered(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $this->createTestPost(['slug' => 'test-first-post']);

        $response = $this->actingAs($user)->get(route('blog.posts.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('posts')
            ->has('posts.data')
            ->has('filters')
        );
    }

    public function test_index_filters_by_status(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('blog.posts.index', ['status' => 'published']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('posts')
            ->where('filters.status', 'published')
        );
    }

    public function test_index_filters_by_search(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('blog.posts.index', ['search' => 'Laravel']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('posts')
            ->where('filters.search', 'Laravel')
        );
    }

    public function test_index_filters_by_tags(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('blog.posts.index', ['tags' => 'php']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('posts')
            ->where('filters.tags', 'php')
        );
    }

    public function test_index_sorts_posts(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('blog.posts.index', [
            'sort_by' => 'published_at',
            'sort_order' => 'asc',
        ]));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('posts')
            ->where('filters.sort_by', 'published_at')
            ->where('filters.sort_order', 'asc')
        );
    }

    public function test_post_can_be_created(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $postData = [
            'title' => 'New Post',
            'slug' => 'test-new-post',
            'content' => 'This is the post content.',
            'description' => 'Post description',
            'published_at' => now()->toDateTimeString(),
            'tags' => ['laravel', 'php'],
            'author' => 'Test Author',
        ];

        $response = $this->actingAs($user)->post(route('blog.posts.store'), $postData);

        $response->assertValid();
        $response->assertRedirect(route('blog.posts.index'));
        $response->assertSessionHas('success', 'Post created successfully.');

        // Verify file exists
        $this->assertTrue(Storage::disk('local')->exists('blog/posts/test-new-post.mdx'));

        // Verify post can be retrieved via service
        $post = app(PostService::class)->find('test-new-post');
        $this->assertNotNull($post);
        $this->assertEquals('New Post', $post->title);
        $this->assertEquals('This is the post content.', $post->content);
    }

    public function test_post_creation_requires_title(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('blog.posts.store'), [
            'slug' => 'test-slug',
            'content' => 'Content',
        ]);

        $response->assertInvalid(['title']);
    }

    public function test_post_creation_requires_slug(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('blog.posts.store'), [
            'title' => 'Test Title',
            'content' => 'Content',
        ]);

        $response->assertInvalid(['slug']);
    }

    public function test_post_creation_requires_valid_slug_format(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('blog.posts.store'), [
            'title' => 'Test Title',
            'slug' => 'Invalid Slug!',
            'content' => 'Content',
        ]);

        $response->assertInvalid(['slug']);
    }

    public function test_post_creation_requires_content(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('blog.posts.store'), [
            'title' => 'Test Title',
            'slug' => 'test-slug',
        ]);

        $response->assertInvalid(['content']);
    }

    public function test_post_creation_rejects_duplicate_slug(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $this->createTestPost(['slug' => 'test-existing-post']);

        $response = $this->actingAs($user)->post(route('blog.posts.store'), [
            'title' => 'New Post',
            'slug' => 'test-existing-post',
            'content' => 'Content',
        ]);

        $response->assertInvalid(['slug']);
    }

    public function test_post_can_be_updated(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $this->createTestPost(['slug' => 'test-original-post', 'title' => 'Original Title']);

        $updateData = [
            'title' => 'Updated Title',
            'content' => 'Updated content',
        ];

        $response = $this->actingAs($user)->put(route('blog.posts.update', ['post' => 'test-original-post']), $updateData);

        $response->assertValid();
        $response->assertRedirect();
        $response->assertSessionHas('success', 'Post updated successfully.');

        // Verify file was updated
        $this->assertTrue(Storage::disk('local')->exists('blog/posts/test-original-post.mdx'));

        // Verify post was updated via service
        $post = app(PostService::class)->find('test-original-post');
        $this->assertNotNull($post);
        $this->assertEquals('Updated Title', $post->title);
        $this->assertEquals('Updated content', $post->content);
    }

    public function test_post_update_returns_404_for_nonexistent_post(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put(route('blog.posts.update', ['post' => 'nonexistent']), [
            'title' => 'Updated Title',
        ]);

        $response->assertNotFound();
    }

    public function test_post_can_be_deleted(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $this->createTestPost(['slug' => 'test-post-to-delete']);

        // Verify file exists before deletion
        $this->assertTrue(Storage::disk('local')->exists('blog/posts/test-post-to-delete.mdx'));

        $response = $this->actingAs($user)->delete(route('blog.posts.destroy', ['post' => 'test-post-to-delete']));

        $response->assertRedirect(route('blog.posts.index'));
        $response->assertSessionHas('success', 'Post deleted successfully.');

        // Verify file was deleted
        $this->assertFalse(Storage::disk('local')->exists('blog/posts/test-post-to-delete.mdx'));

        // Verify post no longer retrievable via service
        $post = app(PostService::class)->find('test-post-to-delete');
        $this->assertNull($post);
    }

    public function test_post_deletion_returns_404_for_nonexistent_post(): void
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->delete(route('blog.posts.destroy', ['post' => 'nonexistent']));

        $response->assertNotFound();
    }
}
