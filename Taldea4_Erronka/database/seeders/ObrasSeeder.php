<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Obra;
use Carbon\Carbon;

class ObrasSeeder extends Seeder
{
    public function run(): void
    {
        $obras = [
            // --- ARTE KLASIKOA ---
            [
                'izenburua' => 'Dama Klasikoa',
                'artista' => 'Mikel_Classic',
                'data' => '1890',
                'mota' => 'klasikoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Klasiko/Kirudi1.jpg', 
                'deskribapena' => 'Erretratu klasikoa olioz egina, argi naturalarekin.',
                'kokalekua' => 'Bilboko Arte Ederren Museoa',
                'prezioa' => 1200
            ],
            [
                'izenburua' => 'Paisai Zaharra',
                'artista' => 'Lorea_Art',
                'data' => '1905',
                'mota' => 'klasikoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Klasiko/Kirudi2.jpg',
                'deskribapena' => 'Natura hila eta paisaia lasaia.',
                'kokalekua' => 'Bilduma Pribatua',
                'prezioa' => 950
            ],
            [
                'izenburua' => 'Begirada Sakona',
                'artista' => 'Unknown',
                'data' => '1910',
                'mota' => 'klasikoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Klasiko/Kirudi3.jpeg',
                'deskribapena' => 'Errealismo handiko lana.',
                'kokalekua' => 'San Telmo Museoa',
                'prezioa' => 2500
            ],
            [
                'izenburua' => 'Loreak eta Argia',
                'artista' => 'Klasiko_Master',
                'data' => '1920',
                'mota' => 'klasikoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Klasiko/Kirudi4.jpg',
                'deskribapena' => 'Konposizio klasiko orekatua.',
                'kokalekua' => 'Guggenheim',
                'prezioa' => 1800
            ],

            // --- ARTE MODERNOA ---
            [
                'izenburua' => 'Abstrakzio Urdina',
                'artista' => 'Modern_Jone',
                'data' => '2023',
                'mota' => 'modernoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Moderno/Mirudi1.jpg',
                'deskribapena' => 'Forma geometrikoak eta kolore biziak.',
                'kokalekua' => 'Tabakalera',
                'prezioa' => 450
            ],
            [
                'izenburua' => 'Kaos Ordenatua',
                'artista' => 'Iker_Pint',
                'data' => '2024',
                'mota' => 'modernoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Moderno/Mirudi2.jpg',
                'deskribapena' => 'Sentimenduen adierazpen librea mihise gainean.',
                'kokalekua' => 'Artetxea Galeria',
                'prezioa' => 600
            ],
            [
                'izenburua' => 'Koloreen Dantza',
                'artista' => 'Ane_M',
                'data' => '2024',
                'mota' => 'modernoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Moderno/Mirudi3.png',
                'deskribapena' => 'Akrilikoa eta teknika mistoa.',
                'kokalekua' => 'Salgai',
                'prezioa' => 300
            ],
            [
                'izenburua' => 'Etorkizuna',
                'artista' => 'Future_Art',
                'data' => '2024',
                'mota' => 'modernoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Moderno/Mirudi4.jpg',
                'deskribapena' => 'Arte digitalaren inspirazioa olioan.',
                'kokalekua' => 'Donostia',
                'prezioa' => 550
            ],

            // --- ARTE URBANOA ---
            [
                'izenburua' => 'Kalearen Ahotsa',
                'artista' => 'Graff_King',
                'data' => '2024',
                'mota' => 'urbanoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Urbano/Uirudi2.png',
                'deskribapena' => 'Hormirudia spray bidez egina.',
                'kokalekua' => 'Egia Tuneleko Hormak',
                'prezioa' => 150
            ],
            [
                'izenburua' => 'Spray & Soul',
                'artista' => 'Urban_Queen',
                'data' => '2023',
                'mota' => 'urbanoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Urbano/Uirudi3.jpeg',
                'deskribapena' => 'Errealismoa eta graffiti estiloa nahastuz.',
                'kokalekua' => 'Skate Park',
                'prezioa' => 200
            ],
            [
                'izenburua' => 'Hiri Ametsak',
                'artista' => 'Street_Art',
                'data' => '2024',
                'mota' => 'urbanoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Urbano/Uirudi5.jpg',
                'deskribapena' => 'Hiriko paisaia modernoak.',
                'kokalekua' => 'Gros',
                'prezioa' => 180
            ],
            [
                'izenburua' => 'Underground',
                'artista' => 'Mural_X',
                'data' => '2024',
                'mota' => 'urbanoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Urbano/Uirudi7.jpg',
                'deskribapena' => 'Kultura urbanoaren adierazpena.',
                'kokalekua' => 'Antigua',
                'prezioa' => 220
            ],

            // --- ESKULTURA ---
            [
                'izenburua' => 'Burdinazko Indarra',
                'artista' => 'Iron_Man',
                'data' => '2020',
                'mota' => 'eskultura',
                'irudia' => '/assets/Irudiak-Galeria/Eskulturak/Eskul1.jpg',
                'deskribapena' => 'Burdina forjatuzko eskultura abstraktua.',
                'kokalekua' => 'Peine del Viento ingurua',
                'prezioa' => 3000
            ],
            [
                'izenburua' => 'Harrizko Isiltasuna',
                'artista' => 'Stone_Art',
                'data' => '2019',
                'mota' => 'eskultura',
                'irudia' => '/assets/Irudiak-Galeria/Eskulturak/Eskul2.jpg',
                'deskribapena' => 'Harrian landutako bustoa.',
                'kokalekua' => 'Museoaren Lorategia',
                'prezioa' => 1500
            ],
            [
                'izenburua' => 'Oreka',
                'artista' => 'Balance_X',
                'data' => '2022',
                'mota' => 'eskultura',
                'irudia' => '/assets/Irudiak-Galeria/Eskulturak/Eskul3.jpg',
                'deskribapena' => 'Zur eta metal nahasketa.',
                'kokalekua' => 'Salgai',
                'prezioa' => 800
            ],
            [
                'izenburua' => 'Forma Organikoak',
                'artista' => 'Natura_S',
                'data' => '2023',
                'mota' => 'eskultura',
                'irudia' => '/assets/Irudiak-Galeria/Eskulturak/Eskul4.jpg',
                'deskribapena' => 'Buztinezko eskultura modernoa.',
                'kokalekua' => 'Tailerra',
                'prezioa' => 400
            ],
            // --- 5. ENKANTEAK (SUBASTAS) ---
            [
                'izenburua' => 'Subasta Berezia: Urrezko Aroa',
                'artista' => 'Admin Art',
                'data' => '2025',
                'mota' => 'klasikoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Klasiko/Kirudi5.jpg', 
                'deskribapena' => 'Obra berezia enkantean.',
                'kokalekua' => 'Bilbo',
                'prezioa' => null, // Precio actual (se calculará con pujas)
                'hasierako_prezioa' => 100, // Precio de salida
                'enkante_amaiera' => Carbon::now()->addDays(2), // Termina en 2 días
            ],
        [
                'izenburua' => 'PRUEBA EMAIL (3 min)',
                'artista' => 'Tester',
                'data' => '2025',
                'mota' => 'modernoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Moderno/Mirudi1.jpg',
                'deskribapena' => 'Pujatu azkar emaila frogatzeko!',
                'kokalekua' => 'Donostia',
                'prezioa' => null,
                'hasierako_prezioa' => 10, // Merkea
                'enkante_amaiera' => Carbon::now()->addMinutes(3),
            ],
            [
                'izenburua' => 'TEST DEFINITIVO (5 min)',
                'artista' => 'Admin Test',
                'data' => '2025',
                'mota' => 'modernoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Moderno/Mirudi2.jpg',
                'deskribapena' => 'Pujatu orain emaila frogatzeko!',
                'kokalekua' => 'Zerbitzaria',
                'prezioa' => null,
                'hasierako_prezioa' => 5, 
                // Orain hasi eta 5 minutura amaitu
                'enkante_amaiera' => Carbon::now()->addMinutes(3), 
            ],
            // --- 2. DENDAKO PRODUKTUAK (Erosketak) --
            [
                'izenburua' => 'Udazkeneko Paisaia',
                'artista' => 'Ane Art',
                'data' => '2024',
                'mota' => 'modernoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Moderno/Mirudi1.jpg',
                'deskribapena' => 'Olioz egindako paisaia modernoa.',
                'kokalekua' => 'Donostia',
                'prezioa' => 450, // PREZIO FINKOA
                'hasierako_prezioa' => null,
                'enkante_amaiera' => null, // EZ DA ENKANTEA
            ],
            [
                'izenburua' => 'Hiriko Argiak',
                'artista' => 'Urban Jon',
                'data' => '2023',
                'mota' => 'urbanoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Urbano/Uirudi1.avif',
                'deskribapena' => 'New Yorkeko kaleak gauez.',
                'kokalekua' => 'Gasteiz',
                'prezioa' => 120, // MERKEA
                'hasierako_prezioa' => null,
                'enkante_amaiera' => null,
            ],
            [
                'izenburua' => 'Burdinazko Eskultura',
                'artista' => 'Txillida Fan',
                'data' => '2000',
                'mota' => 'eskultura',
                'irudia' => '/assets/Irudiak-Galeria/Eskulturak/Eskul1.jpg',
                'deskribapena' => 'Burdinazko pieza txikia.',
                'kokalekua' => 'Hernani',
                'prezioa' => 1200, // GARESTIA
                'hasierako_prezioa' => null,
                'enkante_amaiera' => null,
            ],
             [
                'izenburua' => 'Lore Urdinak',
                'artista' => 'Lorea',
                'data' => '2025',
                'mota' => 'klasikoa',
                'irudia' => '/assets/Irudiak-Galeria/Arte Klasiko/Kirudi2.jpg',
                'deskribapena' => 'Dekoraziorako aproposa.',
                'kokalekua' => 'Baiona',
                'prezioa' => 85,
                'hasierako_prezioa' => null,
                'enkante_amaiera' => null,
            ],
        ];

        foreach ($obras as $obra) {
            Obra::create($obra);
        }
    }
}