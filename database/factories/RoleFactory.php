<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(['admin', 'commissioner', 'clerk', 'petitioner']),
            'display_name' => fake()->jobTitle(),
            'description' => fake()->sentence(),
        ];
    }

    /**
     * Indicate that the role is admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'admin',
            'display_name' => 'Administrator',
            'description' => 'System administrator with full access',
        ]);
    }

    /**
     * Indicate that the role is commissioner.
     */
    public function commissioner(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'commissioner',
            'display_name' => 'Komisioner',
            'description' => 'Commissioner with decision-making authority',
        ]);
    }

    /**
     * Indicate that the role is clerk.
     */
    public function clerk(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'clerk',
            'display_name' => 'Panitera',
            'description' => 'Clerk responsible for case management',
        ]);
    }

    /**
     * Indicate that the role is petitioner.
     */
    public function petitioner(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'petitioner',
            'display_name' => 'Pemohon',
            'description' => 'Petitioner who submits disputes',
        ]);
    }
}