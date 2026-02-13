<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kontaktua;
use Inertia\Inertia;

class KontaktuaController extends Controller
{
    public function index()
    {
        return Inertia::render('Kontaktua');
    }

    // Mezua gorde
    public function store(Request $request)
    {
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mezua' => 'required|string|max:2000',
        ]);

        Kontaktua::create($validated);

        // Orri berera itzuli 'success' mezu batekin
        return back()->with('success', 'Zure mezua ondo bidali da! Laster jarriko gara zurekin harremanetan.');
    }
}