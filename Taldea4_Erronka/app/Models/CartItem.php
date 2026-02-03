<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'obra_id'];

    public function obra()
    {
        return $this->belongsTo(Obra::class);
    }
}