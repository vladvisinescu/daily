<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Query\Builder;

class Habit extends Model
{
    use HasFactory;

    protected $table = 'habits';

    protected $fillable = [
        'user_id',
        'title',
        'body',
        'meta',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function entries(): HasMany
    {
        return $this->hasMany(HabitEntry::class, 'habit_id', 'id');
    }

    public function recentEntries(): HasMany
    {
        $startDate = now()->subMonths(2)->startOfMonth();

        return $this->hasMany(HabitEntry::class, 'habit_id', 'id')
            ->where('created_at', '>', $startDate);
    }
}
