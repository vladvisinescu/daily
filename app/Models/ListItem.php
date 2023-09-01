<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ListItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_id',
        'title'
    ];

    public function entries(): HasMany
    {
        return $this->hasMany(ListEntry::class, 'list_item_entry', 'id');
    }
}
