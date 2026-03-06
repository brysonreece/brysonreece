<?php

namespace Tests\Feature\Pomelo;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageVariationControllerTest extends TestCase
{
    public function test_store_dispatches_batch_and_returns_batch_id(): void
    {
        Bus::fake();
        Storage::fake('local');

        $image = UploadedFile::fake()->image('product.jpg');

        $response = $this->post('http://pomelo.bryson.test/variations', [
            'image' => $image,
            'prompt' => 'sunny beach',
            'count' => 2,
            'quality' => 'medium',
        ]);

        $response->assertStatus(202)
            ->assertJsonStructure(['batchId']);

        $batchId = $response->json('batchId');
        $this->assertEquals(2, Cache::get("pomelo:{$batchId}:total"));
    }

    public function test_store_requires_image(): void
    {
        $response = $this->withHeaders(['Accept' => 'application/json'])
            ->post('http://pomelo.bryson.test/variations', [
                'prompt' => 'sunny beach',
                'count' => 1,
            ]);

        $response->assertStatus(422);
    }

    public function test_store_requires_count_between_1_and_5(): void
    {
        Storage::fake('local');
        $image = UploadedFile::fake()->image('product.jpg');

        $this->withHeaders(['Accept' => 'application/json'])
            ->post('http://pomelo.bryson.test/variations', [
                'image' => $image,
                'count' => 0,
            ])->assertStatus(422);

        $this->withHeaders(['Accept' => 'application/json'])
            ->post('http://pomelo.bryson.test/variations', [
                'image' => $image,
                'count' => 6,
            ])->assertStatus(422);
    }

    public function test_status_returns_404_for_unknown_batch(): void
    {
        $response = $this->get('http://pomelo.bryson.test/variations/nonexistent-id');

        $response->assertNotFound();
    }

    public function test_status_returns_pending_when_no_images_completed(): void
    {
        $batchId = 'test-batch-id';
        Cache::put("pomelo:{$batchId}:total", 3, now()->addMinutes(25));

        $response = $this->get("http://pomelo.bryson.test/variations/{$batchId}");

        $response->assertOk()
            ->assertJson([
                'status' => 'pending',
                'progress' => 0,
                'total' => 3,
                'images' => [],
            ]);
    }

    public function test_status_returns_complete_when_all_images_ready(): void
    {
        $batchId = 'test-batch-id';
        Cache::put("pomelo:{$batchId}:total", 2, now()->addMinutes(25));
        Cache::put("pomelo:{$batchId}:0", 'https://example.com/img1.png', now()->addMinutes(25));
        Cache::put("pomelo:{$batchId}:1", 'https://example.com/img2.png', now()->addMinutes(25));

        $response = $this->get("http://pomelo.bryson.test/variations/{$batchId}");

        $response->assertOk()
            ->assertJson([
                'status' => 'complete',
                'progress' => 2,
                'total' => 2,
            ])
            ->assertJsonCount(2, 'images');
    }

    public function test_status_returns_failed_when_all_jobs_failed(): void
    {
        $batchId = 'test-batch-id';
        Cache::put("pomelo:{$batchId}:total", 2, now()->addMinutes(25));
        Cache::put("pomelo:{$batchId}:failed", 2, now()->addMinutes(25));

        $response = $this->get("http://pomelo.bryson.test/variations/{$batchId}");

        $response->assertOk()
            ->assertJson([
                'status' => 'failed',
                'progress' => 0,
                'total' => 2,
            ]);
    }

    public function test_status_returns_complete_with_partial_failure(): void
    {
        $batchId = 'test-batch-id';
        Cache::put("pomelo:{$batchId}:total", 3, now()->addMinutes(25));
        Cache::put("pomelo:{$batchId}:0", 'https://example.com/img1.png', now()->addMinutes(25));
        Cache::put("pomelo:{$batchId}:1", 'https://example.com/img2.png', now()->addMinutes(25));
        Cache::put("pomelo:{$batchId}:failed", 1, now()->addMinutes(25));

        $response = $this->get("http://pomelo.bryson.test/variations/{$batchId}");

        $response->assertOk()
            ->assertJson([
                'status' => 'complete',
                'progress' => 2,
                'total' => 3,
            ])
            ->assertJsonCount(2, 'images');
    }
}
