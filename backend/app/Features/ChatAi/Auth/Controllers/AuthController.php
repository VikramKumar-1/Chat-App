<?php

namespace App\Features\ChatAi\Auth\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Features\ChatAi\Auth\Services\AuthService;
use App\Features\ChatAi\Auth\Requests\LoginRequest;
use App\Features\ChatAi\Auth\Requests\RegisterRequest;
use App\Features\ChatAi\Auth\Requests\ForgotPasswordRequest;
use App\Features\ChatAi\Auth\Requests\ResetPasswordRequest;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        return response()->json(
            $this->authService->register($request->validated())
        );
    }

    public function login(LoginRequest $request)
    {
        return response()->json(
            $this->authService->login($request->validated())
        );
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $status = $this->authService
            ->forgotPassword($request->email);

        return response()->json([
            'status' => __($status)
        ]);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = $this->authService
            ->resetPassword($request->validated());

        return response()->json([
            'status' => __($status)
        ]);
    }
}
