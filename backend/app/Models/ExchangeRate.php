<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    protected $fillable = ['base','code','rate','as_of'];
    protected $casts = [
        'rate' => 'decimal:8',
        'as_of' => 'date'
    ];
}
