<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MatriculeMatchesMention implements ValidationRule
{
    public function __construct(
        private readonly string $mention,
        private readonly int $admissionYear,
    ) {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $matricule = strtoupper(trim((string) $value));
        $mentionConfig = config("student.mentions.{$this->mention}");

        if (!$mentionConfig) {
            $fail('La mention sélectionnée est invalide.');
            return;
        }

        if (!preg_match($mentionConfig['matricule_pattern'], $matricule)) {
            $fail(sprintf(
                'Le matricule doit respecter le format %s pour la mention %s.',
                $mentionConfig['matricule_example'],
                $mentionConfig['label'],
            ));
            return;
        }

        $yearSuffix = substr((string) $this->admissionYear, -2);
        $expectedFragment = strtoupper($mentionConfig['matricule_letter']) . $yearSuffix;

        if (!str_contains($matricule, $expectedFragment)) {
            $fail(sprintf(
                'Le matricule doit contenir %s pour une première année en %d.',
                $expectedFragment,
                $this->admissionYear,
            ));
        }
    }
}
