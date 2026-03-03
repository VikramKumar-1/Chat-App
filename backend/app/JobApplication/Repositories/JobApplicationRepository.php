<?php

namespace App\JobApplication\Repositories;

use App\JobApplication\Models\JobApplication;

class JobApplicationRepository
{
    public function create(array $data)
    {
        return JobApplication::create($data);
    }

    public function findUserApplication($id, $userId)
    {
        return JobApplication::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();
    }

    public function getUserApplications($userId)
    {
        return JobApplication::where('user_id', $userId)->get();
    }
}