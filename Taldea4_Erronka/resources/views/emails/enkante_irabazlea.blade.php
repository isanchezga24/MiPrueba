<!DOCTYPE html>
<html>
<head>
    <title>Zorionak!</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">

<div class="header">
            <img src="{{ $message->embed(public_path('assets/logo-artetxea.png')) }}" 
                 alt="Artetxea Logo" 
                 style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #212529; background-color: white; margin-bottom: 10px; object-fit: cover;">
            
            <h1>🎉 ZORIONAK! 🎉</h1>
            <p>Enkantea irabazi duzu!</p>
        </div>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #d4af37; text-align: center;">ZORIONAK! 🏆</h1>
        
        <p>Kaixo <strong>{{ $obra->irabazlea->izena }}</strong>,</p>
        
        <p>Albiste onak ditugu! Zure pujak irabazi du enkantea.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0;">{{ $obra->izenburua }}</h2>
            <p><strong>Artista:</strong> {{ $obra->artista }}</p>
            <p><strong>Azken Prezioa:</strong> {{ $obra->bids()->max('kopurua') }}€</p>
        </div>

        <p>Mesedez, sartu zure kontuan erosketa amaitzeko.</p>
        
        <div style="text-align: center; margin-top: 30px;">
            <a href="{{ url('/erosketak') }}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Erosketa Amaitu</a>
        </div>
        
        <p style="text-align: center; margin-top: 40px; color: #999; font-size: 12px;">Artetxea Taldea</p>
    </div>
</body>
</html>