<?php

return [
    'mentions' => [
        'informatique' => [
            'label' => 'Informatique',
            'matricule_letter' => 'I',
            'matricule_pattern' => '/^\d{3}I\d{2}$/i',
            'matricule_example' => '001I22',
        ],
        'multimedia' => [
            'label' => 'Multimédia',
            'matricule_letter' => 'M',
            'matricule_pattern' => '/^\d{3}M\d{2}$/i',
            'matricule_example' => '001M22',
        ],
        'management' => [
            'label' => 'Management',
            'matricule_letter' => 'N',
            'matricule_pattern' => '/^\d{3}N\d{2}$/i',
            'matricule_example' => '001N22',
        ],
    ],

    'parcours' => [
        'professionnel' => 'Master professionnel',
        'recherche' => 'Master recherche',
    ],

    'statuses' => [
        'pending' => 'En attente de validation',
        'approved' => 'Validé',
        'rejected' => 'Refusé',
    ],
];
