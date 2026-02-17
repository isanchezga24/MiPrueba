<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Obra;
use App\Models\Kontaktua;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail; 
use App\Mail\KontaktuaErantzuna;    

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

        $obrak = Obra::latest()->get();
        $kontaktuak = Kontaktua::latest()->get();
        $erabiltzaileak = User::latest()->get(); // <--- Cargamos TODOS los usuarios

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'obrak' => $obrak,
            'kontaktuak' => $kontaktuak,
            'erabiltzaileak' => $erabiltzaileak // <--- Pasamos los usuarios al frontend
        ]);
    }

    public function store(Request $request)
    {
        // ... (Tu código actual de store obras se mantiene igual)
        $validated = $request->validate([
            'izenburua' => 'required|string|max:255',
            'artista' => 'required|string|max:255',
            'data' => 'required|string',
            'mota' => 'required|string',
            'deskribapena' => 'required|string',
            'kokalekua' => 'required|string',
            'irudia' => 'required|image|max:5120',
            'prezioa' => 'nullable|numeric', 
            'hasierako_prezioa' => 'nullable|numeric',
            'enkante_amaiera' => 'nullable|date',
        ]);

        if ($request->hasFile('irudia')) {
            $path = $request->file('irudia')->store('obras', 'public');
            $validated['irudia'] = '/storage/' . $path;
        }

        Obra::create($validated);
        return back()->with('success', 'Obra ondo igo da!');
    }

    public function destroyObra($id)
    {
        Obra::findOrFail($id)->delete();
        return back()->with('success', 'Obra ondo ezabatu da!');
    }

    public function destroyKontaktua($id)
    {
        Kontaktua::findOrFail($id)->delete();
        return back()->with('success', 'Mezua ezabatu da!');
    }

    // --- NUEVO: ELIMINAR USUARIO ---
    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        
        // Evitamos que el admin se borre a sí mismo por error
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'Ezin duzu zeure burua ezabatu!']);
        }
        
        $user->delete();
        return back()->with('success', 'Erabiltzailea ondo ezabatu da!');
    }

// --- RESPONDER MENSAJE (ENVIAR EMAIL Y BORRAR) ---
    public function erantzunMezua(Request $request, $id)
    {
        $request->validate(['erantzuna' => 'required|string']);
        
        $mezua = Kontaktua::findOrFail($id);

        // 1. Enviamos el correo real
        Mail::to($mezua->email)->send(new KontaktuaErantzuna($mezua, $request->erantzuna));

        // 2. BORRAMOS EL MENSAJE DE LA BASE DE DATOS
        $mezua->delete();

        // 3. Volvemos al dashboard (Inertia actualizará la lista automáticamente)
        return back()->with('success', 'Erantzuna ondo bidali zaio erabiltzaileari eta mezua ezabatu da!');
    }
}