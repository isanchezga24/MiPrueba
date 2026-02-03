<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Obra;
use App\Models\CartItem;
use Inertia\Inertia; // <--- HAU GEHITU BEHAR DA
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ErosketaEgina;

class ErosketaController extends Controller
{
    // 1. EROSKETAK ORRIA ERAKUTSI (Produktuekin)
    public function index()
    {
        // Salgai daudenak: Prezioa dute, EZ dira enkantea, eta EZ daude salduta
        $obras = Obra::whereNotNull('prezioa')
            ->whereNull('enkante_amaiera') // Ez direnak enkantea
            ->whereNull('eroslea_id')      // Ez daudenak salduta
            ->whereNull('irabazlea_id')
            ->with(['likes']) // Like-ak kargatzeko
            ->get()
            ->map(function ($obra) {
                return [
                    'id' => $obra->id,
                    'izenburua' => $obra->izenburua,
                    'artista' => $obra->artista,
                    'irudia' => $obra->irudia,
                    'prezioa' => $obra->prezioa,
                    'mota' => $obra->mota,
                    'likes_count' => $obra->likes->count(),
                    'is_liked' => $obra->isLikedBy(Auth::user()),
                ];
            });

        return Inertia::render('Erosketak', [
            'obras' => $obras
        ]);
    }

    // 2. EROSI FUNTZIOA (Lehen zenuena)
    public function erosi(Request $request)
    {
        $request->validate([
            'bidalketa.izena' => 'required',
            'bidalketa.abizenak' => 'required',
            'bidalketa.helbidea' => 'required',
            'bidalketa.hiria' => 'required',
            'bidalketa.pk' => 'required',
        ]);

        $user = Auth::user();
        $cartItemIds = CartItem::where('user_id', $user->id)->pluck('obra_id');

        if ($cartItemIds->isEmpty()) {
            return response()->json(['error' => 'Saskia hutsik dago.'], 400);
        }

        $obras = Obra::whereIn('id', $cartItemIds)->get();
        $total = 0;

        foreach ($obras as $obra) {
            if ($obra->eroslea_id || $obra->irabazlea_id) {
                return response()->json(['error' => "Barkatu, '${obra->izenburua}' jada salduta dago."], 409);
            }
            $total += $obra->prezioa;
        }

        foreach ($obras as $obra) {
            $obra->update(['eroslea_id' => $user->id]);
        }

        CartItem::where('user_id', $user->id)->delete();

        if ($user->email) {
            Mail::to($user->email)->send(new ErosketaEgina($obras, $total, $request->bidalketa));
        }

        return response()->json(['message' => 'Erosketa ondo burutu da!']);
    }
}