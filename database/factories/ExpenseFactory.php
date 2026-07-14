<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'description' => fake()->sentence(),
            'amount' => fake()->randomFloat(2, 1, 1000),
            'expense_date' => fake()->dateTimeThisYear(),
            'created_by' => 1, // Default created_by, adjust as necessary
        ];
    }
}
