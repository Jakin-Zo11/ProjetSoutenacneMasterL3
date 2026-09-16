<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionFile extends Model
{
    protected $fillable = [
        'student_submission_id',
        'type',
        'original_name',
        'path',
        'mime_type',
        'size',
    ];

    protected $hidden = ['path'];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(StudentSubmission::class, 'student_submission_id');
    }
}