<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class CleanRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // mapping of Persian role names to canonical English role names
        $map = [
            'مدیر' => 'admin',
            'فروشنده' => 'seller',
            'نظارت کننده' => 'monitor',
        ];

        foreach ($map as $persian => $english) {
            $persianRole = Role::where('name', $persian)->first();
            $englishRole = Role::where('name', $english)->first();

            if ($persianRole) {
                if ($englishRole) {
                    // reassign users to existing english role
                    User::where('role_id', $persianRole->id)
                        ->update(['role_id' => $englishRole->id]);

                    // delete the persian role
                    $persianRole->delete();
                } else {
                    // rename persian role to english canonical name
                    $persianRole->name = $english;
                    $persianRole->save();
                }
            }
        }

        // ensure canonical roles exist
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'seller']);
        Role::firstOrCreate(['name' => 'monitor']);
    }
}
