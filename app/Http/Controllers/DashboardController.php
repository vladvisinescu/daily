<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        return Inertia::render('Dashboard', [
            'habits' => Habit::where('user_id', auth()->user()->id)
                ->withCount('recentEntries')
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
                })
        ]);
    }
}
