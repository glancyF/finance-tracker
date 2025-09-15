<?php

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;


class IndexBudgetsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $items = auth()->user()->budgets()->latest('id')->get(['id','name','amount','currency'])->map(fn($b) => [
           'id' => (int)$b->id,
           'name' => $b->name,
            'amount' => (float)$b->amount,
            'currency' => $b->currency,
        ]);

        return response()->json(['items' => $items]);
    }
}
