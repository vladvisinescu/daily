<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HabitEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'habit_id',
        'created_at'
    ];
}
