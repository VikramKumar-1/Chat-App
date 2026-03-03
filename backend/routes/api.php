<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

Route::get('/test', function () {
    return "API working";
});
require base_path('app/Features/ChatAi/Auth/Routes/api.php');
require base_path('app/Features/ChatAi/Routes/api.php');
Broadcast::routes(['middleware' => ['auth:sanctum']]);