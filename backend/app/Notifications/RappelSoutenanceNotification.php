<?php

namespace App\Notifications;

use App\Models\Soutenance;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RappelSoutenanceNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $soutenance;
    protected $hoursBefore;

    /**
     * Create a new notification instance.
     *
     * @param  \App\Models\Soutenance  $soutenance
     * @param  int  $hoursBefore
     * @return void
     */
    public function __construct(Soutenance $soutenance, $hoursBefore = 24)
    {
        $this->soutenance = $soutenance;
        $this->hoursBefore = $hoursBefore;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $soutenance = $this->soutenance;
        $depot = $soutenance->depot;
        $room = $soutenance->room;
        $hoursText = $this->hoursBefore === 24 ? 'demain' : 'dans ' . $this->hoursBefore . ' heures';

        return (new MailMessage)
            ->subject('Rappel de Soutenance - ' . $depot->title)
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line('Ceci est un rappel pour votre soutenance qui aura lieu ' . $hoursText . '.')
            ->line('**Détails de la soutenance :**')
            ->line('- **Titre du mémoire :** ' . $depot->title)
            ->line('- **Date et heure :** ' . $soutenance->date->format('d/m/Y à H:i'))
            ->line('- **Salle :** ' . ($room ? $room->name : 'Non définie'))
            ->line('Veuillez vous assurer d\'être présent à l\'heure et d\'avoir préparé votre présentation.')
            ->action('Voir les détails', url('/api/v1/admin/soutenances/' . $soutenance->id))
            ->line('Bon courage pour votre soutenance !');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array<string, mixed>
     */
    public function toArray($notifiable)
    {
        $soutenance = $this->soutenance;
        $depot = $soutenance->depot;
        $room = $soutenance->room;

        return [
            'soutenance_id' => $soutenance->id,
            'depot_id' => $depot->id,
            'title' => $depot->title,
            'date' => $soutenance->date->format('Y-m-d H:i:s'),
            'room' => $room ? $room->name : null,
            'hours_before' => $this->hoursBefore,
            'message' => 'Rappel : Votre soutenance aura lieu ' . ($this->hoursBefore === 24 ? 'demain' : 'dans ' . $this->hoursBefore . ' heures'),
        ];
    }
}
