<?php

namespace App\Features\ChatAi\Conversations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Features\ChatAi\Models\Conversation;
use App\Features\ChatAi\Models\ConversationParticipant;
use App\Features\ChatAi\Models\Message;

class ConversationController extends Controller
{
    protected $service;

    public function __construct(ConversationService $service)
    {
        $this->service = $service;
    }

    public function openPrivate($userId)
    {
        return response()->json(
            $this->service->openPrivate($userId)
        );
    }

    public function createGroup(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'participants' => 'required|array|min:1'
        ]);

        return response()->json(
            $this->service->createGroup(
                $request->title,
                $request->participants
            )
        );
    }
    
      

         public function index()
    {
        $userId = Auth::id();

         $conversations = \App\Features\ChatAi\Models\Conversation::whereHas('participants',
            fn($q) => $q->where('user_id', $userId))
        ->with([
            'participants.user:id,name,username',
            'messages' => fn($q) => $q->latest()->limit(1)
        ])
        ->get();

    $data = $conversations->map(function ($conversation) use ($userId) {

        $participant = $conversation->participants
            ->firstWhere('user_id', $userId);

        $lastMessage = $conversation->messages->first();

        // Determine title
        if ($conversation->type === 'private') {
            $otherUser = $conversation->participants
                ->firstWhere('user_id', '!=', $userId)
                ->user;

            $title = $otherUser->name;
        } else {
            $title = $conversation->title;
        }

        return [
            'conversation_id' => $conversation->id,
            'type' => $conversation->type,
            'title' => $title,
            'last_message' => $lastMessage?->content,
            'last_message_time' => $lastMessage
                ? $lastMessage->created_at->format('h:i A')
                : null,
            'unread_count' => $participant?->unread_count ?? 0
        ];
    });

    return response()->json($data);
   }
    // public function messages($conversationId)
    // {
    //     $messages = Message::where('conversation_id', $conversationId)
    //         ->with('sender:id,name,username')
    //         ->latest()
    //         ->paginate(20);

    //     return response()->json($messages);
    // }
    public function messages($conversationId)
  {
    $messages = \App\Features\ChatAi\Models\Message::with('sender')
        ->where('conversation_id', $conversationId)
        ->orderBy('created_at', 'asc')
        ->get();

    return response()->json($messages);
  }
}