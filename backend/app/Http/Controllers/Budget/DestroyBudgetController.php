<?php

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Http\Request;

class DestroyBudgetController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Budget $budget)
    {
        abort_if($budget->user_id !== $request->user()->id, 403,'Forbidden');
        $budget->delete();
        return response()->json(['ok'=>true]);
    }
}
