<?php

namespace Database\Seeders;

use App\Models\Habit;
use App\Models\HabitEntry;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Vlad',
            'email' => 'vladvisinescu@gmail.com',
            'password' => bcrypt('honterus')
        ]);

        Habit::factory(10)->for($admin, 'user')->create()->each(function (Habit $habit) {
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
    }
}
