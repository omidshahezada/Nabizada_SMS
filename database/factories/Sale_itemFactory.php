<?php

namespace Database\Factories;

use App\Models\Sale_item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sale_item>
 */
class Sale_itemFactory extends Factory
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
                'product_id' => 1, // Default product_id, adjust as necessary
                'quantity' => fake()->numberBetween(1, 10),
                'unit_price' => fake()->randomFloat(2, 1, 100),
                'discount' => fake()->randomFloat(2, 0, 20),
                'total_price' => fake()->randomFloat(2, 1, 100),  

        ];
    }
}
