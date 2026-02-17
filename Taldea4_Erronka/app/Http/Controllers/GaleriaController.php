<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Obra;
use App\Models\Like; // Gogoratu hau inportatzea
use Illuminate\Support\Facades\Auth;

class GaleriaController extends Controller
{
    // 1. GALERIA ERAKUTSI
   public function index()
    {
        $obrak = Obra::with('likes')->get()->map(function ($obra) {
            return [
                'id' => $obra->id,
                'izenburua' => $obra->izenburua,
                'artista' => $obra->artista,
                'irudia' => $obra->irudia,
                'mota' => $obra->mota, 
                'kokalekua' => $obra->kokalekua, 
                'likes_count' => $obra->likes->count(),
      
                'is_liked' => Auth::check() ? $obra->likes->where('user_id', Auth::id())->count() > 0 : false,
            ];
        });

        $obrak = $obrak->sortByDesc('likes_count')->values();

        return Inertia::render('Galeria', [
            'obrak' => $obrak
        ]);
    }

    // 2. LIKE EMAN EDO KENDU
    public function toggleLike($id)
    {
        $obra = Obra::findOrFail($id);
        $userId = Auth::id();

        // Begiratu ea lehendik like-a emanda daukagun
        $like = Like::where('obra_id', $obra->id)->where('user_id', $userId)->first();

        if ($like) {
            // Bageneukan, ezabatu egingo dugu (Unlike)
            $like->delete();
        } else {
            // Ez geneukan, sortu egingo dugu (Like)
            Like::create([
                'obra_id' => $obra->id,
                'user_id' => $userId
            ]);
        }
        
        // Atzera itzuli eta React-ek automatikoki datu berriak kargatuko ditu
        return back();
    }

   // 3. RANKING ORRIA
    public function ranking()
    {
        // Obra GUZTIAK kargatu, like kopuruaren arabera ordenatuta (TOP 10)
        $ranking = Obra::withCount('likes')
            ->orderByDesc('likes_count')
            ->take(10) 
            ->get();

        return Inertia::render('Ranking', [
            'ranking' => $ranking
        ]);
    }
}