<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, int $budget)
    {
        $q = trim((string)$request->query('q',''));
        $items = $request->user()
            ->categories()
            ->when($q !== '', fn($b) => $b->where('name','like','%{$q}%'))
            ->orderBy('name')->limit(50)
            ->get(['id','name'])
            ->map(fn($c) =>['id' => (int)$c->id,'name'=>$c->name]);
        return response()->json(['items'=>$items]);
    }
}
