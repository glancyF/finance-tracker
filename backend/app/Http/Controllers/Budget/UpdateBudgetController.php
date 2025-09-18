<?php

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use App\Http\Requests\Budget\UpdateBudgetRequest;
use App\Models\Budget;


class UpdateBudgetController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateBudgetRequest $request, Budget $budget)
    {
        $budget->update($request->validated());
        return response()->json([
            'item' => [
                'id' => (int)$budget->id,
                'name' => $budget->name,
                'amount' => (float)$budget->amount,
                'currency' => $budget->currency,

            ]
        ]);
    }
}
