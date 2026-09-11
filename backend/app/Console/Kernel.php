<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Envoyer les rappels de soutenance 24h avant (exécution quotidennement à 8h)
        $schedule->command('soutenances:send-reminders --hours=24')
            ->dailyAt('08:00')
            ->description('Envoyer les rappels de soutenance 24h avant');

        // Envoyer les rappels de soutenance 48h avant (exécution quotidennement à 8h)
        $schedule->command('soutenances:send-reminders --hours=48')
            ->dailyAt('08:00')
            ->description('Envoyer les rappels de soutenance 48h avant');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
