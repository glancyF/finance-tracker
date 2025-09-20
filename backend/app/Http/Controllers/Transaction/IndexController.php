<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request,Budget $budget)
    {
        $this->authorize('view',$budget);
        $items = $budget->transaction()->with('category:id,name')->orderByDesc('date')->get()->map(fn($ft) =>[
           'id' => (int)$ft->id,
           'type' => $ft->type,
            'amount'=>(float)$ft->amount,
            'date' => $ft->date->format('Y-m-d'),
            'comment' => $ft->comment,
            'category'=>$ft->category?['id'=>(int)$ft->category->id,'name'=>$ft->category->name]:null,
        ]);
        return response()->json(['items' => $items]);
    }
}
