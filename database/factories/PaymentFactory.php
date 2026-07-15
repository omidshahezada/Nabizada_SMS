<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sale_id' => 1, // Default sale_id, adjust as necessary
            'amount' => fake()->randomFloat(2, 1, 1000),
            'payment_date' => fake()->dateTimeThisYear(),
            'created_by' => 1, // Default created_by, adjust as necessary
            'notes' => fake()->sentence(),
        ];
    }
}
