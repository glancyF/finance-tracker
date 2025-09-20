<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class DestroyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Transaction $transaction)
    {
        $this->authorize('delete',$transaction);
        $transaction->delete();
        return response()->noContent();
    }
}
