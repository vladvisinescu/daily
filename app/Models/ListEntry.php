<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ListEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'list_item_id',
        'created_at'
    ];

    public function listItem(): BelongsTo
    {
        return $this->belongsTo(ListItem::class, 'list_item_id', 'id');
    }
}
