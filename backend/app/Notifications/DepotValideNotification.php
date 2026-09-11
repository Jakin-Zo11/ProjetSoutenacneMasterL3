<?php

namespace App\Notifications;

use App\Models\Depot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DepotValideNotification extends Notification implements ShouldQueue
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
            ->subject('Dépôt de Mémoire Validé - ' . $depot->title)
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line('Votre dépôt de mémoire a été validé avec succès.')
            ->line('**Détails du dépôt :**')
            ->line('- **Titre du mémoire :** ' . $depot->title)
            ->line('- **Date de validation :** ' . $depot->validated_at->format('d/m/Y à H:i'))
            ->line('Votre mémoire est désormais éligible pour la planification de la soutenance.')
            ->action('Voir les détails', url('/api/v1/admin/depots/' . $depot->id))
            ->line('Félicitations pour cette étape importante.');
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
            'status' => 'valide',
            'validated_at' => $depot->validated_at->format('Y-m-d H:i:s'),
            'message' => 'Votre dépôt de mémoire "' . $depot->title . '" a été validé.',
        ];
    }
}
