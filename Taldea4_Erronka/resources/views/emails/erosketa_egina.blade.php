<!DOCTYPE html>
<html>
<head>
    <title>Erosketa Egina</title>
</head>

<body style="font-family: sans-serif; color: #333;">

        <div class="header">
            <img src="{{ $message->embed(public_path('assets/logo-artetxea.png')) }}" 
                 alt="Artetxea Logo" 
                 style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #ffc107; margin-bottom: 10px; object-fit: cover;">
            
            <h1>ARTETXEA</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #fff;">Erosketa Konfirmazioa</p>
        </div>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #d4af37; text-align: center;">Eskerrik asko zure erosketagatik!</h1>
        <p>Kaixo,</p>
        <p>Zure erosketa ondo prozesatu da. Hemen daukazu laburpena:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f8f9fa;">
                <th style="padding: 10px; text-align: left;">Obra</th>
                <th style="padding: 10px; text-align: right;">Prezioa</th>
            </tr>
            @foreach ($obras as $obra)
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px;">{{ $obra['izenburua'] }} ({{ $obra['artista'] }})</td>
                <td style="padding: 10px; text-align: right;">{{ $obra['prezioa'] }}€</td>
            </tr>
            @endforeach
            <tr>
                <td style="padding: 10px; font-weight: bold;">GUZTIRA</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">{{ $total }}€</td>
            </tr>
        </table>

        <div style="background-color: #f0f0f0; padding: 15px; margin-top: 20px; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #555;">📦 Bidalketa Datuak:</h3>
            <p style="margin: 5px 0;"><strong>Izena:</strong> {{ $bidalketa['izena'] }} {{ $bidalketa['abizenak'] }}</p>
            <p style="margin: 5px 0;"><strong>Helbidea:</strong> {{ $bidalketa['helbidea'] }}</p>
            <p style="margin: 5px 0;"><strong>Herria:</strong> {{ $bidalketa['pk'] }} - {{ $bidalketa['hiria'] }}</p>
        </div>

        <p style="margin-top: 30px;">Laster jarriko gara zurekin harremanetan...</p>

        <p style="margin-top: 30px;">Laster jarriko gara zurekin harremanetan bidalketa egiteko.</p>
        <p>Ondo izan,<br>Artetxea Taldea</p>
    </div>
</body>
</html>