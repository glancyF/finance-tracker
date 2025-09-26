<?php

namespace App\Support;

use App\Models\ExchangeRate;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use RuntimeException;

class MoneyConverter
{
   public function convert(float $amount,string $from,string $to, ?string $base = null):float {
        $from = strtoupper($from);
        $to = strtoupper($to);
        if ($from === $to) {
            return $amount;
        }
        $base = strtoupper($base ?? config('currency.base','USD'));
        $asOf = Carbon::today()->toDateString();
        $cacheKey = "rates:{$base}:{$asOf}";
        $rates = Cache::remember($cacheKey,3600,function () use($base,$asOf){
           return ExchangeRate::where('base',$base)->where('as_of',$asOf)->pluck('rate','code')->map(fn($r) => (float)$r)->toArray();
        });
        if(!$rates) {
            $lastAsOf = ExchangeRate::where('base',$base)->max('as_of');
            if($lastAsOf) {
                $rates = ExchangeRate::where('base',$base)->where('as_of',$lastAsOf)
                    ->pluck('rate','code')->map(fn($r)=>(float)$r)->toArray();
            }
        }
       if (! isset($rates[$from], $rates[$to])) {
           throw new RuntimeException("Rate not available for {$from} or {$to}");
       }

       $inBase = $amount / $rates[$from];
       return $inBase * $rates[$to];
   }
}
