<?php

namespace Database\Factories;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => 1, // Default customer_id, adjust as necessary
            'paid_amount' => fake()->randomFloat(2, 1, 1000),
            'total_amount' => fake()->randomFloat(2, 1, 1000),
            'created_by' => 1, // Default created_by, adjust as necessary
        ];
    }
}
