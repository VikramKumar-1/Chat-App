<?php

namespace App\Features\ChatAi\Auth\Repositories;

use App\Models\User;

class UserRepository
{
  public function create(array $data): User
  {
    return User::create($data);
  }

  public function findByEmailOrUsername(string $value): ?User
  {
    return User::where('email', $value)
         ->orWhere('username',$value)
         ->first();
  }

}