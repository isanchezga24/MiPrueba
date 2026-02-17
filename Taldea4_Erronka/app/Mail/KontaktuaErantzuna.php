<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class KontaktuaErantzuna extends Mailable
{
    use Queueable, SerializesModels;

    public $mezua;
    public $erantzuna;

    public function __construct($mezua, $erantzuna)
    {
        $this->mezua = $mezua;
        $this->erantzuna = $erantzuna;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Artetxea - Zure mezuari erantzuna',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.kontaktua_erantzuna', // Esta vista la creamos ahora
        );
    }
}