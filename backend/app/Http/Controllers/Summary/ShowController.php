<?php

namespace App\Http\Controllers\Summary;

use App\Http\Controllers\Controller;
use App\Support\MoneyConverter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MoneyConverter $converter) :JsonResponse
    {
        $user= request()->user();
        $target = strtoupper($user->default_currency ?? 'USD');
        $details =[];
        $total = 0.0;
        foreach ($user->budgets()->get(['id','name','amount','currency']) as $b) {
            $converted = $converter->convert((float) $b->amount, $b->currency,$target);
            $details[] = [
                'budget_id' => (int) $b->id,
                'name'      => $b->name,
                'amount'    => (float) $b->amount,
                'currency'  => $b->currency,
                'converted' => round($converted, 2),
            ];
            $total += $converted;
        }
        return response()->json([
            'currency' => $target,
            'total'    => round($total, 2),
            'details'  => $details,
        ]);
    }
}
