<?php

namespace Database\Seeders;

use App\Models\Habit;
use App\Models\HabitEntry;
use App\Models\ListEntry;
use App\Models\ListItem;
use App\Models\Plan;
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

        Plan::factory(5)->create(['user_id' => $admin->id])->each(function (Plan $plan) use ($admin) {
            ListItem::factory(mt_rand(2, 10))->create(['plan_id' => $plan->id, 'user_id' => $admin->id])->each(function(ListItem $listItem) {
                for ($x = 0; $x < 10; $x++) {
                    if (mt_rand(0, 1)) {
                        continue;
                    }

                    ListEntry::create([
                        'created_at' => now()->subDays($x),
                        'list_item_id' => $listItem->id
                    ]);
                }
            });
        });
    }
}
