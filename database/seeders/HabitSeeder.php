<?php

namespace Database\Seeders;

use App\Models\Habit;
use App\Models\HabitEntry;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HabitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(5)->create()->each(function (User $user) {
            Habit::factory(10)->create(['user_id' => $user->id])->each(function (Habit $habit) {
                for ($x = 0; $x < 300; $x++) {
                    if (mt_rand(0, 1)) {
                        continue;
                    }

                    HabitEntry::create([
                        'created_at' => now()->subDays($x),
                        'habit_id' => $habit->id
                    ]);
                }
            });
        });
    }
}
