<?php

namespace Database\Seeders;

use App\Models\Habit;
use App\Models\HabitEntry;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AdminSeeder::class);
        $this->call(HabitSeeder::class);
    }
}
