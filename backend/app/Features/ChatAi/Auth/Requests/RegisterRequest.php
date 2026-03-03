<?php

namespace App\Features\ChatAi\Auth\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    } 

    public function rules(): array
    {
        return [
            'name'=> 'required|string|max:255',
            'username' => 'required|string|max:15|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed'
        ];
    }
}
