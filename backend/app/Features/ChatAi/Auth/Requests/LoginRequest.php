<?php

namespace App\Features\ChatAi\Auth\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
   public function authorize(): bool
   {
          return true;
   }

   public function rules(): array
   {
    return [
        'login' => 'required|string',
        'password' => 'required|string'
      ];
   }

}