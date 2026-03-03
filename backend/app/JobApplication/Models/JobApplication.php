<?php

namespace App\JobApplication\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
   use HasFactory;

   protected $table='job_applications';

   protected $fillable=[
        'user_id',
        'first_name',
        'last_name',
        'father_name',
        'mother_name',
        'dob',
        'gender',
        'category',
        'aadhaar',
        'mobile',
        'email',
        'permanent_address',
        'state',
        'district',
        'pincode',
        'qualification',
        'board',
        'passing_year',
        'percentage',
        'photo_path',
        'signature_path',
        'marksheet_path'
     ];

     public function user()
     {
        return $this->belongsTo(\App\Models\User::class);
     }

}