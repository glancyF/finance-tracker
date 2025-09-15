<?php

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class DestroyBudgetController extends Controller
{
    use AuthorizesRequests;
    /**
     * Handle the incoming request.
     * @throws AuthorizationException
     */
    public function __invoke(Request $request, Budget $budget)
    {
        $this->authorize('delete', $budget);
        $budget->delete();
        return response()->noContent();
    }
}
