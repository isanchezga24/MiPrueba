<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ErosketaEgina extends Mailable
{
    use Queueable, SerializesModels;

    public $obras;
    public $total;
    public $bidalketa; 

  
    public function __construct($obras, $total, $bidalketa)
    {
        $this->obras = $obras;
        $this->total = $total;
        $this->bidalketa = $bidalketa;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Erosketa Konfirmazioa - Artetxea',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.erosketa_egina',
        );
    }
}