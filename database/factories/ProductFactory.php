<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->word(),
            'category_id' => 1, // Default category_id, adjust as necessary
            'quantity' => fake()->numberBetween(1, 100),
            'created_by' => 1, // Default created_by, adjust as necessary
            'barcode' => fake()->unique()->ean13(),
            'purchase_price' => fake()->randomFloat(2, 1, 100),
            'sell_price' => fake()->randomFloat(2, 1, 100),

        ];
    }
}
