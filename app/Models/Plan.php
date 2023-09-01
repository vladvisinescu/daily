<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title'
    ];

    /**
     * @param Builder $query
     * @param User $user
     * @return void
     */
    public function scopeForUser(Builder $query, User $user): void
    {
        $query->where('user_id', $user->id);
    }

    public function listItems(): HasMany
    {
        return $this->hasMany(ListItem::class, 'plan_id', 'id');
    }
}
