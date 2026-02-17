<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Obra;
use App\Models\CartItem;
use Inertia\Inertia; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ErosketaEgina;

class ErosketaController extends Controller
{
    // 1. EROSKETAK ORRIA ERAKUTSI (Produktuekin)
  public function index()
    {
        $obras = Obra::whereNotNull('prezioa')
            ->whereNull('enkante_amaiera')
            ->whereNull('eroslea_id')
            ->whereNull('irabazlea_id')
            ->get()
            ->map(function ($obra) {
                return [
                    'id' => $obra->id,
                    'izenburua' => $obra->izenburua,
                    'artista' => $obra->artista,
                    'irudia' => $obra->irudia,
                    'prezioa' => $obra->prezioa,
                    'mota' => $obra->mota,
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
            'bidalketa.abizena' => 'required',
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
                return response()->json(['error' => "Barkatu, '{$obra->izenburua}' jada salduta dago."], 409);
            }
            $total += $obra->prezioa;
        }

       foreach ($obras as $obra) {
            /** @var \App\Models\Obra $obra */
            $obra->eroslea_id = $user->id;
            $obra->save();
        }

        CartItem::where('user_id', $user->id)->delete();

        if ($user->email) {
            Mail::to($user->email)->send(new ErosketaEgina($obras, $total, $request->bidalketa));
        }

        return response()->json(['message' => 'Erosketa ondo burutu da!']);
    }
}