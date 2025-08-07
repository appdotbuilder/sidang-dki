<?php

namespace Database\Factories;

use App\Models\Dispute;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dispute>
 */
class DisputeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'case_number' => $this->generateCaseNumber(),
            'title' => 'Sengketa ' . fake()->sentence(4),
            'description' => fake()->paragraphs(3, true),
            'petitioner_id' => User::factory(),
            'respondent_agency' => 'Dinas ' . fake()->randomElement(['Pendidikan', 'Kesehatan', 'Sosial', 'Perhubungan', 'Lingkungan Hidup']) . ' DKI Jakarta',
            'status' => fake()->randomElement(['submitted', 'verified', 'scheduled', 'in_progress', 'decided', 'closed']),
            'category' => fake()->randomElement(['information_access', 'information_dispute', 'objection', 'other']),
            'incident_date' => fake()->dateTimeBetween('-6 months', '-1 month'),
            'petitioner_demands' => fake()->paragraphs(2, true),
            'submitted_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }

    /**
     * Generate a unique case number.
     */
    protected function generateCaseNumber(): string
    {
        $year = fake()->dateTimeBetween('-2 years', 'now')->format('Y');
        $month = fake()->numberBetween(1, 12);
        $number = fake()->numberBetween(1, 999);
        
        return sprintf('KI-DKI/%03d/%02d/%s', $number, $month, $year);
    }

    /**
     * Indicate that the dispute is submitted.
     */
    public function submitted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'submitted',
            'verified_at' => null,
            'verified_by' => null,
        ]);
    }

    /**
     * Indicate that the dispute is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'verified',
            'verified_at' => fake()->dateTimeBetween($attributes['submitted_at'], 'now'),
            'verified_by' => User::factory(),
        ]);
    }

    /**
     * Indicate that the dispute is closed.
     */
    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'closed',
            'verified_at' => fake()->dateTimeBetween($attributes['submitted_at'], 'now'),
            'verified_by' => User::factory(),
        ]);
    }
}