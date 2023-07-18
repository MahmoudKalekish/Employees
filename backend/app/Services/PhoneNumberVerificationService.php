<?php

namespace App\Services;

use GuzzleHttp\Client;

class PhoneNumberVerificationService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.apilayer.com/number_verification/',
            'headers' => [
                'apikey' => config('services.phone_verification.api_key'),
            ],
        ]);
    }

    public function validateNumber($number)
    {
        $response = $this->client->get('validate', [
            'query' => [
                'number' => $number,
            ],
        ]);

        return json_decode($response->getBody(), true);
    }
}
