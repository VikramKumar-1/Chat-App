<?php

namespace App\JobApplication\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobApplicationRequest extends FormRequest
{
  
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
            return [
                'first_name' => 'required|string',
            'last_name' => 'required|string',
            'father_name' => 'required|string',
            'mother_name' => 'required|string',
            'dob' => 'required|date',
            'gender' => 'required|string',
            'category' => 'required|string',
            'aadhaar' => 'required|string',
            'mobile' => 'required|string',
            'email' => 'required|email',

            'permanent_address' => 'required|string',
            'state' => 'required|string',
            'district' => 'required|string',
            'pincode' => 'required|string',

            'qualification' => 'required|string',
            'board' => 'required|string',
            'passing_year' => 'required|integer',
            'percentage' => 'required|numeric',

            'photo' => 'required|image',
            'signature' => 'required|image',
            'marksheet' => 'required|mimes:pdf'
            
            ];
    }

}