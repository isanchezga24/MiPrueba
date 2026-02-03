<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EnkanteController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ErosketaController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Ruta Principal
Route::get('/', function () {
    return Inertia::render('Hasiera');
})->name('hasiera');

// Rutas Públicas
Route::get('/forua', function () {
    return Inertia::render('Forua'); // Aquí pasarás los datos de la DB más adelante
})->name('forua');

Route::get('/ranking', function () {
    return Inertia::render('Ranking');
})->name('ranking');

Route::get('/galeria', function () {
    return Inertia::render('Galeria');
})->name('galeria');

Route::get('/kontaktua', function () {
    return Inertia::render('Kontaktua');
})->name('kontaktua');

// Rutas de Usuario (Auth)
Route::get('/erregistratu', function () {
    return Inertia::render('Erregistratu');
})->name('register');

Route::get('/erosketak', [App\Http\Controllers\ErosketaController::class, 'index'])->name('erosketak');

Route::get('/enkanteak', function () {
    return Inertia::render('Enkanteak');
})->name('enkanteak');
use App\Http\Controllers\GaleriaController;

// Galeria Publikoa
Route::get('/galeria', [GaleriaController::class, 'index'])->name('galeria');

// Ranking Publikoa
Route::get('/ranking', [GaleriaController::class, 'ranking'])->name('ranking');

// Like emateko (Login beharrezkoa)
Route::post('/obra/{id}/like', [GaleriaController::class, 'toggleLike'])
    ->middleware(['auth'])
    ->name('obra.like');

Route::get('/enkanteak', [EnkanteController::class, 'index'])->name('enkanteak');
Route::post('/enkante/{id}/pujar', [EnkanteController::class, 'pujar'])
    ->middleware(['auth'])
    ->name('enkante.pujar');

     // Admin Dashboard Ruta
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    
    // Admin Panela ikusi
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // OBRA GORDE (Hau da falta zena edo gaizki zegoena)
    Route::post('/obrak', [AdminController::class, 'store'])->name('admin.obrak.store');

});
   
    // Ruta para comprar (protegida para usuarios logueados)
Route::post('/erosi', [ErosketaController::class, 'erosi'])
    ->middleware(['auth'])
    ->name('erosi');
Route::middleware(['auth'])->group(function () {
    Route::get('/cart', [CartController::class, 'index']);      // Ver carrito
    Route::post('/cart', [CartController::class, 'add']);       // Añadir
    Route::delete('/cart/{id}', [CartController::class, 'remove']); // Borrar
});
// Si tienes rutas de Fortify (login, logout), Laravel las gestiona automáticamente,
// pero asegúrate de que tus botones apunten a /login o /logout.