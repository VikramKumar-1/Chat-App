<?php

namespace App\JobApplication\Services;

use App\JobApplication\Repositories\JobApplicationRepository;
use App\JobApplication\Pdf\JobApplicationPdfGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobApplicationService
{
    protected JobApplicationRepository $repo;
    protected JobApplicationPdfGenerator $pdf;

    public function __construct(
        JobApplicationRepository $repo,
        JobApplicationPdfGenerator $pdf
    ) {
        $this->repo = $repo;
        $this->pdf = $pdf;
    }

    /**
     * Get authenticated user ID or fail
     */
    private function getAuthUserId(): int
    {
        $user = Auth::user();
        
        if (!$user) {
            abort(401, 'Unauthorized');
        }
        
        return $user->id;
    }

    public function store(Request $request)
    {
        $data = $request->validated();
        $data['user_id'] = $this->getAuthUserId();

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('photos', 'public');
        }

        if ($request->hasFile('signature')) {
            $data['signature_path'] = $request->file('signature')->store('signatures', 'public');
        }

        if ($request->hasFile('marksheet')) {
            $data['marksheet_path'] = $request->file('marksheet')->store('marksheets', 'public');
        }

        return $this->repo->create($data);
    }

    public function show(int $id)
    {
        $application = $this->repo->findUserApplication($id, $this->getAuthUserId());
        
        if (!$application) {
            abort(404, 'Application not found');
        }
        
        return $application;
    }

    public function myApplications()
    {
        return $this->repo->getUserApplications($this->getAuthUserId());
    }

    public function download(int $id)
    {
        $application = $this->repo->findUserApplication($id, $this->getAuthUserId());

        if (!$application) {
            abort(404, 'Application not found');
        }

        return $this->pdf->generate($application);
    }
}