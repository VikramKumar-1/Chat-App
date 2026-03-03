<?php

namespace App\Features\ChatAi\Models;

use Illuminate\Database\Eloquent\Model;

class ConversationParticipant extends Model
{
    protected $fillable = [
        'conversation_id',
        'user_id',
        'role',
        'is_muted',
        'is_pinned',
        'is_archived',
        'unread_count',
        'joined_at'
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}