<?php

namespace App\Features\ChatAi\Conversations;

use App\Features\ChatAi\Models\Conversation;
use App\Features\ChatAi\Models\ConversationParticipant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;

class ConversationService
{
     public function openPrivate($otherUserId)
 {
    $userId = Auth::id();

    if ($userId == $otherUserId) {
        throw new Exception("Cannot chat with yourself.");
    }

    // Check if conversation already exists
    $conversation = Conversation::where('type', 'private')
        ->whereHas('participants', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })
        ->whereHas('participants', function ($q) use ($otherUserId) {
            $q->where('user_id', $otherUserId);
        })
        ->first();

    if ($conversation) {
        return $conversation;
    }

    return DB::transaction(function () use ($userId, $otherUserId) {

        $conversation = Conversation::create([
            'type' => 'private',
            'created_by' => $userId
        ]);

        // Insert logged-in user
        ConversationParticipant::create([
            'conversation_id' => $conversation->id,
            'user_id' => $userId,
            'role' => 'admin',
            'unread_count' => 0
        ]);

        // Insert other user (THIS WAS MISSING)
        ConversationParticipant::create([
            'conversation_id' => $conversation->id,
            'user_id' => $otherUserId,
            'role' => 'member',
            'unread_count' => 0
        ]);

        return $conversation;
    });
  }

       public function createGroup($title, array $participants)
    {
        $creatorId = Auth::id();

        return DB::transaction(function () use ($title, $participants, $creatorId) {

            $conversation = Conversation::create([
                'type' => 'group',
                'title' => $title,
                'created_by' => $creatorId
            ]);

            $all = array_unique(array_merge([$creatorId], $participants));

            foreach ($all as $userId) {
                ConversationParticipant::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $userId,
                    'role' => $userId == $creatorId ? 'admin' : 'member'
                ]);
            }

            return $conversation;
        });

    }
}