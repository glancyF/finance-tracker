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

        $page = max(1, (int)$request->query('page',1));
        $perPage = min(100,max(1, (int)$request->query('perPage',20)));
        $sort = (string)$request->query('sort','-date');
        $query = $budget->transaction()->with('category:id,name');

        $allowed = ['id','date','amount'];
        foreach (explode(',', $sort) as $term) {
            $dir = str_starts_with($term, '-') ? 'desc' : 'asc';
            $col = ltrim($term, '-');
            if (in_array($col, $allowed, true)) {
                $query->orderBy($col, $dir);
            }
        }
        $p = $query->paginate($perPage,['*'],'page',$page);

        $items = $p->getCollection()->map(function ($t) {
            return [
                'id'       => (int)$t->id,
                'type'     => $t->type,
                'amount'   => (float)$t->amount,
                'date'     => $t->date->format('Y-m-d'),
                'comment'  => $t->comment,
                'category' => $t->category ? [
                    'id'   => (int)$t->category->id,
                    'name' => $t->category->name
                ] : null,
            ];
        })->values();

        return response()->json([
            'items' => $items,
            'meta'  => [
                'total'        => $p->total(),
                'per_page'     => $p->perPage(),
                'current_page' => $p->currentPage(),
                'last_page'    => $p->lastPage(),
                'from'         => $p->firstItem(),
                'to'           => $p->lastItem(),
            ],
        ]);
    }
}
