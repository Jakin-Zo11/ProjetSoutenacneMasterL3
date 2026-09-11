<?php

namespace App\Traits;

use App\Models\ActivityLog;

trait Loggable
{
    /**
     * Log an activity.
     *
     * @param  string  $action
     * @param  string|null  $description
     * @return \App\Models\ActivityLog
     */
    protected function logActivity(string $action, ?string $description = null): ActivityLog
    {
        return ActivityLog::log($action, $description);
    }
}
