<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->unique()->word() . ' ' . fake()->randomNumber(2),
            'building' => fake()->word(),
            'capacity' => fake()->numberBetween(10, 100),
            'is_active' => true,
        ];
    }
}
