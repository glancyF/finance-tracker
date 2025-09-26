<?php

namespace App\Actions;

use App\Models\ExchangeRate;
use Carbon\Carbon;


class StoreRatesSnapshot
{
    public function __invoke(string $base, array $rates): void
    {
        $base = strtoupper($base);
        $asOf = Carbon::today()->startOfDay();


        ExchangeRate::updateOrCreate(
            ['base' => $base, 'code' => $base, 'as_of' => $asOf],
            ['rate' => 1.0]
        );

        $supported = config('currency.supported', []);
        foreach ($rates as $code => $rate) {
            $code = strtoupper((string)$code);

            if (!in_array($code, $supported, true)) {
                continue;
            }
            if (!is_scalar($rate) || !is_numeric($rate)) {
                continue;
            }

            ExchangeRate::updateOrCreate(
                ['base' => $base, 'code' => $code, 'as_of' => $asOf],
                ['rate' => (float)$rate]
            );
        }
    }

}
