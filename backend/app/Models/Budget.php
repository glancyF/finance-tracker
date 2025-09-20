<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    protected $fillable = ['name','amount','currency'];
    public function user() {
        return $this->belongsTo(User::class);
    }
    public function transaction() {
        return $this->hasMany(Transaction::class);
    }
    public function categories() {
        return $this->hasMany(Category::class);
    }
}
