<?php

namespace App\Features\ChatAi\Messages;

use App\Features\ChatAi\Models\Message;
use App\Features\ChatAi\Models\MessageStatus;
use App\Features\ChatAi\Models\ConversationParticipant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Events\MessageSent;
class MessageService
{
   /* public function send(array $data)
    {
        $senderId = Auth::id();

        return DB::transaction(function () use ($data, $senderId) {

            $conversationId = $data['conversation_id'];

            $participant = ConversationParticipant::where([
                'conversation_id' => $conversationId,
                'user_id' => $senderId
            ])->exists();

            if (!$participant) {
                throw new Exception("Unauthorized.");
            }

            $message = Message::create([
                'conversation_id' => $conversationId,
                'sender_id' => $senderId,
                'type' => $data['type'] ?? 'text',
                'content' => $data['content'] ?? null
            ]);

            $others = ConversationParticipant::where('conversation_id', $conversationId)
                ->where('user_id', '!=', $senderId)
                ->get();

            foreach ($others as $user) {

                MessageStatus::create([
                    'message_id' => $message->id,
                    'user_id' => $user->user_id,
                    'status' => 'sent'
                ]);

                $user->increment('unread_count');
            }

           // return $message->load('sender');
             return $message;
        });
        broadcast(new MessageSent($message))->toOthers();

        return $message->load('sender');
    }*/
        public function send(array $data)
{
    $senderId = Auth::id();

    return DB::transaction(function () use ($data, $senderId) {

        $conversationId = $data['conversation_id'];

        $participant = ConversationParticipant::where([
            'conversation_id' => $conversationId,
            'user_id' => $senderId
        ])->exists();

        if (!$participant) {
            throw new Exception("Unauthorized.");
        }

        $message = Message::create([
            'conversation_id' => $conversationId,
            'sender_id' => $senderId,
            'type' => $data['type'] ?? 'text',
            'content' => $data['content'] ?? null
        ]);

        $others = ConversationParticipant::where('conversation_id', $conversationId)
            ->where('user_id', '!=', $senderId)
            ->get();

        foreach ($others as $user) {
            MessageStatus::create([
                'message_id' => $message->id,
                'user_id' => $user->user_id,
                'status' => 'sent'
            ]);

            $user->increment('unread_count');
        }

        // 🔥 BROADCAST INSIDE TRANSACTION
       // broadcast(new MessageSent($message->load('sender')))->toOthers();
       broadcast(new MessageSent($message->load('sender')));

        return $message->load('sender');
    });
}
}