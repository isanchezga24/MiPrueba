<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obra extends Model
{
    use HasFactory;

    protected $fillable = [
        'izenburua', 
        'artista', 
        'irudia', 
        'prezioa', 
        'deskribapena', 
        'mota', 
        'data', 
        'kokalekua',
        'enkante_amaiera',   
        'hasierako_prezioa',
        'irabazlea_id',
        'eroslea_id'
    ];

    // Relación con Pujas
    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    // Relación con Likes
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function irabazlea()
    {
        return $this->belongsTo(User::class, 'irabazlea_id');
    }
    // Helper para saber si le he dado like
    public function isLikedBy($user)
    {
        if (!$user) return false;
        return $this->likes()->where('user_id', $user->id)->exists();
    }
}