<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kontaktua extends Model
{
    use HasFactory;

    protected $table = 'kontaktuak';
    protected $fillable = ['izena', 'email', 'mezua'];
}