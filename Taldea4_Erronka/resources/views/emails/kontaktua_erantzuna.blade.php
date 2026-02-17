<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #333; line-height: 1.6;">
    <h2>Kaixo {{ $mezua->izena }},</h2>
    <p>Eskerrik asko Artetxearekin harremanetan jartzeagatik. Zure mezuari erantzunez:</p>

    <blockquote style="background: #f8f9fa; border-left: 5px solid #ffc107; padding: 15px; font-size: 16px;">
        {{ $erantzuna }}
    </blockquote>

    <br>
    <p style="color: #666; font-size: 14px;"><strong>Hau izan zen idatzi zenuen mezua:</strong><br>
    <em>"{{ $mezua->mezua }}"</em></p>

    <br>
    <p>Agur bero bat,<br><strong>Artetxea Taldea</strong></p>
</body>
</html>