<?php

use Illuminate\Support\Facades\Broadcast;
use App\Features\ChatAi\Models\ConversationParticipant;

Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
    return ConversationParticipant::where([
        'conversation_id' => $conversationId,
        'user_id' => $user->id
    ])->exists();
});