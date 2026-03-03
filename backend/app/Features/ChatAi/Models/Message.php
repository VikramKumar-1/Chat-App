<?php

namespace App\Features\ChatAi\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'conversation_id',
        'sender_id',
        'type',
        'content',
        'reply_to',
        'ai_generated'
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender()
    {
        return $this->belongsTo(\App\Models\User::class, 'sender_id');
    }

    public function statuses()
    {
        return $this->hasMany(MessageStatus::class);
    }

    public function reply()
    {
        return $this->belongsTo(Message::class, 'reply_to');
    }
}