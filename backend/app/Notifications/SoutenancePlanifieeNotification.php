<?php

namespace App\Notifications;

use App\Models\Soutenance;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SoutenancePlanifieeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $soutenance;

    /**
     * Create a new notification instance.
     *
     * @param  \App\Models\Soutenance  $soutenance
     * @return void
     */
    public function __construct(Soutenance $soutenance)
    {
        $this->soutenance = $soutenance;
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
        $etudiant = $depot->etudiant;
        $room = $soutenance->room;
        $session = $soutenance->sessionSoutenance;

        return (new MailMessage)
            ->subject('Soutenance Planifiée - ' . $depot->title)
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line('Votre soutenance a été planifiée avec succès.')
            ->line('**Détails de la soutenance :**')
            ->line('- **Titre du mémoire :** ' . $depot->title)
            ->line('- **Date et heure :** ' . $soutenance->date->format('d/m/Y à H:i'))
            ->line('- **Salle :** ' . ($room ? $room->name : 'Non définie'))
            ->line('- **Session :** ' . ($session ? $session->title : 'Non définie'))
            ->line('Veuillez vous assurer d\'être présent à l\'heure prévue.')
            ->action('Voir les détails', url('/api/v1/admin/soutenances/' . $soutenance->id))
            ->line('Merci de votre attention.');
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
            'message' => 'Votre soutenance a été planifiée pour le ' . $soutenance->date->format('d/m/Y à H:i'),
        ];
    }
}
