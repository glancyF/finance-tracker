<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['user_id','budget_id','category_id','type','amount','date','comment'];
    protected $casts = ['date' => 'date', 'amount' =>'decimal:2'];
    public function user(){ return $this->belongsTo(User::class); }
    public function category(){ return $this->belongsTo(Category::class); }
    public function budget(){ return $this->belongsTo(Budget::class); }

}
