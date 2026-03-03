<?php

namespace App\Features\ChatAi\Messages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Features\ChatAi\Models\Message;
use App\Features\ChatAi\Models\MessageStatus;
use App\Features\ChatAi\Models\ConversationParticipant;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSeen;
use App\Events\MessageDelivered;
class MessageController extends Controller
{
    protected $service;

    public function __construct(MessageService $service)
    {
        $this->service = $service;
    }

    public function send(Request $request)
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'type' => 'required|string',
            'content' => 'nullable|string'
        ]);

        return response()->json(
            $this->service->send($request->all())
        );
    }

    public function markSeen($conversationId)
    {
       $userId = Auth::id();

        $messageIds = Message::where('conversation_id', $conversationId)
            ->where('sender_id', '!=', $userId)
            ->pluck('id');

        MessageStatus::whereIn('message_id', $messageIds)
            ->where('user_id', $userId)
            ->update([
                'status' => 'seen',
                'seen_at' => now()
            ]);

        ConversationParticipant::where([
            'conversation_id' => $conversationId,
            'user_id' => $userId
        ])->update(['unread_count' => 0]);

           foreach ($messageIds as $messageId) {
        broadcast(new MessageSeen($messageId, $conversationId));
      }


        return response()->json(['status' => 'seen']);
    }

     public function markDelivered(Request $request, $conversationId)
  {
    $messageId = $request->message_id;

    MessageStatus::where('message_id', $messageId)
        ->update(['status' => 'delivered']);

    broadcast(new MessageDelivered($messageId, $conversationId));

    return response()->json(['status' => 'delivered']);
   }
}