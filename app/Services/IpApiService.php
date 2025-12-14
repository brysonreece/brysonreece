<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

/**
 * A service to interact with the ip-api.com API.
 */
class IpApiService
{
    /**
     * The base URL of the ip-api.com API.
     */
    protected string $baseUrl = 'http://ip-api.com/json';

    /**
     * The required query fields for the API response.
     *
     * @var array<int, string>
     */
    protected array $requiredQueryFields = [
        'status',
        'message',
    ];

    /**
     * Geolocate an IP address.
     *
     * @param  string  $ip  The IP address to geolocate.
     * @param  array<string, int>  $fields  The fields to include in the response.
     * @return array<string, mixed> The geolocation details of the IP address.
     *
     * @throws \Illuminate\Http\Client\RequestException
     */
    public function geolocate(
        string $ip,
        array $fields = [
            'as',
            'city',
            'country',
            'isp',
            'lat',
            'lon',
            'org',
            'query',
            'regionName',
            'timezone',
            'zip',
        ],
    ): array {
        $response = Http::get("{$this->baseUrl}/{$ip}", [
            'fields' => implode(',', [
                ...$this->requiredQueryFields,
                ...$fields,
            ]),
        ])->throw();

        // Throw an exception if the request succeeded but the API response status is 'fail'
        throw_if($response->json('status') === 'fail', new RequestException($response));

        return $response->json();
    }
}
