<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use App\Models\HabitEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HabitsController extends Controller
{

    public function store(Request $request)
    {
        Habit::create([
            'user_id' => auth()->user()->id,
            'title' => $request->input('title')
        ]);

        return response()->json([
            'habits' => Habit::where('user_id', auth()->user()->id)
                ->withCount('recentEntries')
                ->withCount('todayEntries')
                ->with(['recentEntries' => function ($query) {
                    return $query->select(['id', 'created_at', 'habit_id']);
                }])
                ->latest()
                ->get()
                ->map(function (Habit $habit) {
                    return $habit->setRelation(
                        'recentEntries',
                        $habit->recentEntries->unique('created_at')->pluck('created_at')
                            ->map(fn($date) => Carbon::parse($date)->format('Y-m-d'))
                    );
                }),
        ]);
    }

    public function track(Habit $habit, Request $request)
    {
        $habit->entries()->create([
            'habit_id' => $habit->id
        ]);

        return $habit
            ->refresh()
            ->loadCount('recentEntries')
            ->loadCount('todayEntries')
            ->load(['recentEntries' => function ($query) {
                return $query->select(['id', 'created_at', 'habit_id']);
            }])
            ->setRelation(
                'recentEntries',
                $habit->recentEntries->unique('created_at')->pluck('created_at')
                    ->map(fn($date) => Carbon::parse($date)->format('Y-m-d'))
            );
    }
}
