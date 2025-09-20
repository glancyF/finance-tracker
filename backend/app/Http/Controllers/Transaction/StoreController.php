<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Models\Budget;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreTransactionRequest $request, Budget $budget)
    {
        $user = $request->user();
        $this->authorize('view',$budget);
        return DB::transaction(function () use ($request, $budget, $user) {
            $cid = $request->integer('category_id')??null;
            $cname= trim((string)$request->input('category_name'));
           if(!$cid && $cname !==''){
                    $cid = Category::firstOrCreate(
                        ['user_id' => $user->id, 'name' => $cname],
                        ['name' => $cname]
                    )->id;
           }


           $t = Transaction::create([
              'user_id' => $user->id,
              'budget_id' => $budget->id,
              'category_id' => $cid,
              'type' => $request->input('type'),
              'amount' => $request->input('amount'),
               'date' => $request->input('date'),
               'comment' => $request->input('comment'),
           ]);
            $t->load('category:id,name');
           return response()->json([
               'item'=>[
                   'id'=>(int)$t->id,
                   'type'=>$t->type,
                   'amount'=>(float)$t->amount,
                   'date'=>$t->date->format('Y-m-d'),
                   'comment'=>$t->comment,
                   'category'=>$t->category?['id'=>(int)$t->category->id,'name'=>$t->category->name]:null,
               ]
           ],201);
        });
    }
}
