<?php

namespace App\Features\ChatAi\Models;

use Illuminate\Database\Eloquent\Model;

class MessageStatus extends Model
{     
     protected $table = 'message_status';
    protected $fillable = [
        'message_id',
        'user_id',
        'status',
        'delivered_at',
        'seen_at'
    ];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}