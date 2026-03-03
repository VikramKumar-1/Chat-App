<?php

namespace App\JobApplication\Controllers;

use App\Http\Controllers\Controller;
use App\JobApplication\Requests\StoreJobApplicationRequest;
use App\JobApplication\Services\JobApplicationService;
use Illuminate\Http\JsonResponse;

class JobApplicationController
{
   protected JobApplicationService $service;

    public function __construct(JobApplicationService $service)
    {
        $this->service = $service;
    }

    public function store(StoreJobApplicationRequest $request): JsonResponse
    {
        
    $application = $this->service->store($request);

    return response()->json([
        'success' => true,
        'message' => 'Application submitted successfully',
        'id' => $application->id
    ], 201);
    }
}