<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Obra;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Obtener el carrito del usuario
    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)
            ->with('obra')
            ->get()
            ->pluck('obra'); // Devolvemos solo los detalles de la obra

        return response()->json($cartItems);
    }

    // Añadir al carrito
    public function add(Request $request)
    {
        $user = Auth::user();
        $obraId = $request->obra_id;

        // Validar si ya está en su carrito
        if (CartItem::where('user_id', $user->id)->where('obra_id', $obraId)->exists()) {
            return response()->json(['message' => 'Obra hau jada saskian daukazu!'], 409);
        }

        // Validar si ya está vendida
        $obra = Obra::find($obraId);
        if ($obra->eroslea_id || $obra->irabazlea_id) {
            return response()->json(['message' => 'Obra hau ez dago eskuragarri.'], 409);
        }

        CartItem::create([
            'user_id' => $user->id,
            'obra_id' => $obraId
        ]);

        return response()->json(['message' => '✅ Saskira gehituta!']);
    }

    // Eliminar del carrito
    public function remove($id)
    {
        $user = Auth::user();
        // Buscamos por obra_id y user_id para asegurar que borra la suya
        CartItem::where('user_id', $user->id)->where('obra_id', $id)->delete();
        
        return response()->json(['message' => 'Ezabatuta']);
    }
}