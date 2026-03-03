<?php

use Illuminate\Support\Facades\Route;
use App\Features\ChatAi\Conversations\ConversationController;
use App\Features\ChatAi\Messages\MessageController;
use App\Features\ChatAi\Users\UserController;


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/conversations/private/{userId}',
        [ConversationController::class, 'openPrivate']);

    Route::post('/conversations/group',
        [ConversationController::class, 'createGroup']);

    Route::get('/conversations',
        [ConversationController::class, 'index']);

    Route::get('/conversations/{conversationId}/messages',
        [ConversationController::class, 'messages']);

    Route::post('/messages/send',
        [MessageController::class, 'send']);

    Route::post('/conversations/{conversationId}/seen',
        [MessageController::class, 'markSeen']);

    Route::get('/users/search', [UserController::class, 'search']);

    Route::post(
    '/conversations/{conversationId}/delivered',
    [MessageController::class, 'markDelivered']
   );
});