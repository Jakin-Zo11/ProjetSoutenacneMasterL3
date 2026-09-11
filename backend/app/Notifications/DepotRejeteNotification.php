<?php

namespace App\Notifications;

use App\Models\Depot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DepotRejeteNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $depot;

    /**
     * Create a new notification instance.
     *
     * @param  \App\Models\Depot  $depot
     * @return void
     */
    public function __construct(Depot $depot)
    {
        $this->depot = $depot;
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
        $depot = $this->depot;

        return (new MailMessage)
            ->subject('Dépôt de Mémoire Rejeté - ' . $depot->title)
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line('Votre dépôt de mémoire a été rejeté.')
            ->line('**Détails du dépôt :**')
            ->line('- **Titre du mémoire :** ' . $depot->title)
            ->line('- **Date de rejet :** ' . $depot->validated_at->format('d/m/Y à H:i'))
            ->line('- **Remarque :** ' . ($depot->remarque ?: 'Aucune remarque fournie'))
            ->line('Veuillez prendre en compte les remarques et soumettre une nouvelle version si nécessaire.')
            ->action('Voir les détails', url('/api/v1/admin/depots/' . $depot->id))
            ->line('N\'hésitez pas à contacter l\'administration pour plus d\'informations.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array<string, mixed>
     */
    public function toArray($notifiable)
    {
        $depot = $this->depot;

        return [
            'depot_id' => $depot->id,
            'title' => $depot->title,
            'status' => 'rejete',
            'validated_at' => $depot->validated_at->format('Y-m-d H:i:s'),
            'remarque' => $depot->remarque,
            'message' => 'Votre dépôt de mémoire "' . $depot->title . '" a été rejeté.',
        ];
    }
}
