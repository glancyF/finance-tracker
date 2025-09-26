<?php

namespace App\Services;


use Illuminate\Support\Facades\Http;

class CurrencyService
{
    /**
     * Create a new class instance.
     */
   public function fetchLatest(string $base):array {
       $url = config('services.currency.url');
       $key = config('services.currency.key');

       $resp = Http::withHeaders([
           'Accept' => 'application/json',
           'apikey' => $key,
       ])
           ->connectTimeout(5)
           ->timeout(20)
           ->retry(3, 500, throw: false)
           ->withOptions(['force_ip_resolve' => 'v4'])
           ->get($url, [
               'base' => strtoupper($base),
           ]);

       if (!$resp->ok()) {
           return [];
       }

       $json = $resp->json();

       if (isset($json['error'])) {
           return [];
       }

       return $json['rates'] ?? [];

   }

}
