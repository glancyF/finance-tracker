<?php

namespace App\Actions;

use App\Models\ExchangeRate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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


    private function store(string $base, array $payload, string $provider = 'exchangerate.host'): int
    {
        $rates  = $payload['rates'] ?? null;
        $asOfStr = $provider === 'exchangerate.host'
            ? ($payload['date'] ?? null)
            : (isset($payload['time_last_update_utc'])
                ? Carbon::parse($payload['time_last_update_utc'])->format('Y-m-d')
                : null);

        if (!is_array($rates)) {
            return 0;
        }

        $now  = now();
        $asOf = $asOfStr ? Carbon::parse($asOfStr)->startOfDay() : $now->copy()->startOfDay();

        $rows = [[
            'base' => strtoupper($base),
            'code' => strtoupper($base),
            'as_of' => $asOf,
            'rate' => 1.0,
            'created_at' => $now,
            'updated_at' => $now,
        ]];

        foreach ($rates as $code => $rate) {
            if (!is_string($code) || !is_scalar($rate) || !is_numeric($rate)) {
                continue;
            }
            $rows[] = [
                'base' => strtoupper($base),
                'code' => strtoupper($code),
                'as_of' => $asOf,
                'rate' => (float)$rate,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        if (!$rows) return 0;

        DB::table('exchange_rates')->upsert(
            $rows,
            ['base', 'code', 'as_of'],
            ['rate', 'updated_at']
        );

        return count($rows);
    }
}
