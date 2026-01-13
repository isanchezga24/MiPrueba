<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
public function run(): void
    {
        // 1. ADMINISTRAZAILEA (Admin)
        User::create([
            'izena' => 'Admin',         
            'abizenak' => 'Nagusia',     
            'hiria' => 'Bilbo',          
            'kalea' => 'Kale Nagusia 1', 
            'telefonoa' => '667588463',
            'email' => 'admin@artetxea.com',
            'password' => Hash::make('admin123'),
            'rola' => 'Administratzailea',
        ]);

        // 2. ERABILTZAILEA (Usuario Normal de Prueba)
        User::create([
            'izena' => 'Mikel',
            'abizenak' => 'Testa',
            'hiria' => 'Gasteiz',
            'kalea' => 'Dato Kalea 15',
            'telefonoa' => '667778463',
            'email' => 'mikel@gmail.com',
            'password' => Hash::make('12345678'),
            'rola' => 'Erabiltzailea',
        ]);
    }
}