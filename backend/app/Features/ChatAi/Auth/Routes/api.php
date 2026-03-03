<?php

use Illuminate\Support\Facades\Route;
use App\Features\ChatAi\Auth\Controllers\AuthController;

Route::prefix('auth')->group(function (){

     Route::post('/register', [AuthController::class, 'register'])
        ->middleware('throttle:8,1');
        //throttle:  Maximum 8 requests within 1 minute
    
     Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:8,1');     
     
     Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
        ->middleware('throttle:3,1');  
        
     Route::post('/reset-password', [AuthController::class, 'resetPassword']); 
     
     Route::middleware('auth:sanctum')->group(function (){
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',[AuthController::class, 'me']);
     });
});