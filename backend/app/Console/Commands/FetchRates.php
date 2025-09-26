<?php

namespace App\Console\Commands;

use App\Actions\StoreRatesSnapshot;
use App\Services\CurrencyService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FetchRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch {base?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and store currency rates (exchangerate.host)';

    /**
     * Execute the console command.
     */
    public function handle(CurrencyService $svc, StoreRatesSnapshot $store)
    {
        $base = strtoupper($this->argument('base') ?? config('currency.base', 'USD'));
        $rates = $svc->fetchLatest($base);
        if(!$rates) {
            $this->error('Failed to fetch currency rates');
            return 1;
        }
        $store($base, $rates);
        $this->info("Rates stored (base: {$base})");
        return 0;
    }

}
