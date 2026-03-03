<?php

namespace App\JobApplication\Pdf;

use Barryvdh\DomPDF\Facade\Pdf;

class JobApplicationPdfGenerator
{
    public function generate($application)
    {
        $pdf = Pdf::loadView(
            'pdf.job_application',
            compact('application')
        );

        return $pdf->download(
            'Application_'.$application->id.'.pdf'
        );
    }
}
