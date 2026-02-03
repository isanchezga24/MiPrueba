<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Obra;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'erabiltzaileak' => User::count(),
            'obrak_guztira' => Obra::count(),
            'enkantean' => Obra::whereNotNull('enkante_amaiera')->count(),
            'salmentak' => Obra::whereNotNull('eroslea_id')->count(),
        ];

        $azkenObrak = Obra::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'azkenObrak' => $azkenObrak
        ]);
    }

    public function store(Request $request)
    {
        // 1. BALIDAZIOA
        $validated = $request->validate([
            'izenburua' => 'required|string|max:255',
            'artista' => 'required|string|max:255',
            'data' => 'required|string',
            'mota' => 'required|string',
            'deskribapena' => 'required|string',
            'kokalekua' => 'required|string',
            'irudia' => 'required|image|max:5120', // 5MB max
            
            // Hauek NULLABLE dira (Galeria bada, hutsik etorriko dira)
            'prezioa' => 'nullable|numeric', 
            'hasierako_prezioa' => 'nullable|numeric',
            'enkante_amaiera' => 'nullable|date',
        ]);

        // 2. IRUDIA IGO
        if ($request->hasFile('irudia')) {
            $path = $request->file('irudia')->store('obras', 'public');
            $validated['irudia'] = '/storage/' . $path;
        }

        // 3. DATU BASEAN SORTU
        Obra::create($validated);

        return back()->with('success', 'Obra ondo igo da!');
    }
}