<?php

namespace App\Console\Commands;

use App\Models\Soutenance;
use App\Notifications\RappelSoutenanceNotification;
use Illuminate\Console\Command;
use Carbon\Carbon;

class SendSoutenanceReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'soutenances:send-reminders {--hours=24 : Nombre d\'heures avant la soutenance}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envoyer les rappels de soutenance aux étudiants et membres du jury';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $hoursBefore = $this->option('hours');
        $this->info("Recherche des soutenances dans {$hoursBefore} heures...");

        $startDate = Carbon::now()->addHours($hoursBefore);
        $endDate = Carbon::now()->addHours($hoursBefore + 1);

        $soutenances = Soutenance::where('status', 'planifiee')
            ->whereBetween('date', [$startDate, $endDate])
            ->with(['depot.etudiant', 'depot.promotion'])
            ->get();

        if ($soutenances->isEmpty()) {
            $this->info('Aucune soutenance trouvée pour cette période.');
            return Command::SUCCESS;
        }

        $this->info("{$soutenances->count()} soutenance(s) trouvée(s).");

        foreach ($soutenances as $soutenance) {
            $this->info("Traitement de la soutenance #{$soutenance->id} : {$soutenance->depot->title}");

            // Envoyer à l'étudiant
            if ($soutenance->depot->etudiant) {
                $soutenance->depot->etudiant->notify(new RappelSoutenanceNotification($soutenance, $hoursBefore));
                $this->line("  - Rappel envoyé à l'étudiant : {$soutenance->depot->etudiant->name}");
            }

            // TODO: Envoyer aux membres du jury (quand la table jury sera implémentée)
            // foreach ($soutenance->jury as $member) {
            //     $member->notify(new RappelSoutenanceNotification($soutenance, $hoursBefore));
            // }
        }

        $this->info('Rappels envoyés avec succès.');
        return Command::SUCCESS;
    }
}
