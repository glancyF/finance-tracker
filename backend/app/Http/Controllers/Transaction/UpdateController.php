<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\UpdateTransactionRequest;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $this->authorize('update', $transaction);
        return DB::transaction(function () use ($request, $transaction) {
            $data = $request->validated();
            if(array_key_exists('category_name', $data) && !$transaction->category_id){
                $name = trim($data['category_name'] ?? '');
                if($name !== "") {
                    $cat = Category::firstOrCreate(['user_id'=>$transaction->user_id,'name'=>$name],['name'=>$name]);
                    $data['category_id'] = $cat->id;
                }
                unset($data['category_name']);
            }
            $transaction->update($data);
            $transaction->load('category:id,name');
            return response()->json(['item' =>
            [
                'id' => (int)$transaction->id,
                'type'=>$transaction->type,
                'amount'=>(float)$transaction->amount,
                'date'=>$transaction->date->format('Y-m-d'),
                'comment'=>$transaction->comment,
                'category'=>$transaction->category?['id'=>(int)$transaction->category->id,'name'=>$transaction->category->name]:null,
            ]
            ]);
        });
    }
}
