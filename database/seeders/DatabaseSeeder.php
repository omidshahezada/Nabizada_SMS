<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Expense;
use App\Models\Sale;
use App\Models\Sale_item;
use App\Models\Transaction;
use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(30)->create();

        // User::factory()->create([
            // 'name' => 'Test User',
            // 'email' => 'test@example.com',
        // ]);
        Customer::factory(30)->create();
        Product::factory(50)->create();
        Sale::factory(20)->create();
        Sale_item::factory(100)->create();
        Transaction::factory(50)->create();
        Expense::factory(30)->create();

    }
}
