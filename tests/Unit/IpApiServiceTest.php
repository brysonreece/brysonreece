<?php

namespace Tests\Unit;

use App\Services\IpApiService;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class IpApiServiceTest extends TestCase
{
    public function test_geolocate_makes_correct_http_request(): void
    {
        Http::fake([
            'ip-api.com/*' => Http::response([
                'status' => 'success',
                'country' => 'United States',
                'city' => 'New York',
                'query' => '8.8.8.8',
            ], 200),
        ]);

        $service = new IpApiService;
        $result = $service->geolocate('8.8.8.8');

        Http::assertSent(fn($request) => str_contains((string) $request->url(), 'ip-api.com/json/8.8.8.8')
            && str_contains((string) $request->url(), 'fields='));

        $this->assertEquals('success', $result['status']);
        $this->assertEquals('United States', $result['country']);
    }

    public function test_geolocate_includes_required_fields(): void
    {
        Http::fake([
            'ip-api.com/*' => Http::response([
                'status' => 'success',
                'message' => '',
                'country' => 'United States',
            ], 200),
        ]);

        $service = new IpApiService;
        $service->geolocate('8.8.8.8');

        Http::assertSent(fn($request) => str_contains((string) $request->url(), 'status')
            && str_contains((string) $request->url(), 'message'));
    }

    public function test_geolocate_accepts_custom_fields(): void
    {
        Http::fake([
            'ip-api.com/*' => Http::response([
                'status' => 'success',
                'message' => '',
                'customField' => 'value',
            ], 200),
        ]);

        $service = new IpApiService;
        $service->geolocate('8.8.8.8', ['customField']);

        Http::assertSent(fn($request) => str_contains((string) $request->url(), 'customField'));
    }

    public function test_geolocate_throws_exception_on_failed_status(): void
    {
        Http::fake([
            'ip-api.com/*' => Http::response([
                'status' => 'fail',
                'message' => 'invalid query',
            ], 200),
        ]);

        $this->expectException(RequestException::class);

        $service = new IpApiService;
        $service->geolocate('invalid-ip');
    }

    public function test_geolocate_throws_exception_on_http_error(): void
    {
        Http::fake([
            'ip-api.com/*' => Http::response([], 500),
        ]);

        $this->expectException(RequestException::class);

        $service = new IpApiService;
        $service->geolocate('8.8.8.8');
    }

    public function test_geolocate_returns_all_requested_fields(): void
    {
        $expectedFields = [
            'status' => 'success',
            'message' => '',
            'as' => 'AS15169 Google LLC',
            'city' => 'Mountain View',
            'country' => 'United States',
            'isp' => 'Google LLC',
            'lat' => 37.386,
            'lon' => -122.0838,
            'org' => 'Google Public DNS',
            'query' => '8.8.8.8',
            'regionName' => 'California',
            'timezone' => 'America/Los_Angeles',
            'zip' => '94035',
        ];

        Http::fake([
            'ip-api.com/*' => Http::response($expectedFields, 200),
        ]);

        $service = new IpApiService;
        $result = $service->geolocate('8.8.8.8');

        foreach (array_keys($expectedFields) as $key) {
            $this->assertArrayHasKey($key, $result);
        }
    }
}
