<?php

namespace App\Features\ChatAi\Auth\Services;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use App\Features\ChatAi\Auth\Repositories\UserRepository;

class AuthService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $data): array
    {
        $user = $this->userRepository->create($data);

        $user->update([
            'is_online' => true,
            'last_seen' => now()
        ]);

        $token = $user->createToken('chat-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(array $data): array
    {
        $user = $this->userRepository
            ->findByEmailOrUsername($data['login']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'login' => ['Invalid credentials']
            ]);
        }

        $user->update([
            'is_online' => true,
            'last_seen' => now()
        ]);

        $token = $user->createToken('chat-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function logout($user): void
    {
        $user->update([
            'is_online' => false,
            'last_seen' => now()
        ]);

        $user->currentAccessToken()->delete();
    }

    public function forgotPassword(string $email): string
    {
        return Password::sendResetLink(['email' => $email]);
    }

    public function resetPassword(array $data): string
    {
        return Password::reset(
            $data,
            function ($user, $password) {
                $user->update([
                    'password' => $password
                ]);
            }
        );
    }
}
