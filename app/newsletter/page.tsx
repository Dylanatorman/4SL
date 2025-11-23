'use client';

import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function NewsletterPage() {
  const [isClient, setIsClient] = useState(false);
  const [PDFComponents, setPDFComponents] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import PDF components only on client side
    Promise.all([
      import('@react-pdf/renderer'),
      import('@/components/InvestorNewsletter')
    ]).then(([pdfRenderer, newsletter]) => {
      setPDFComponents({
        PDFDownloadLink: pdfRenderer.PDFDownloadLink,
        PDFViewer: pdfRenderer.PDFViewer,
        InvestorNewsletter: newsletter.default
      });
    }).catch(err => {
      console.error('Failed to load PDF components:', err);
    });
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!PDFComponents) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p>Loading PDF generator...</p>
          </div>
        </div>
      </div>
    );
  }

  const { PDFDownloadLink, PDFViewer, InvestorNewsletter } = PDFComponents;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-[#05092B] mb-2">
            Investor Newsletter - December 2025
          </h1>
          <p className="text-gray-600 mb-4">
            Q4 2025 Progress Report for Startup Ignition
          </p>

          {/* Download Button */}
          <PDFDownloadLink
            document={<InvestorNewsletter />}
            fileName="4SL_Investor_Update_Dec2025.pdf"
            className="inline-flex items-center gap-2 bg-[#007097] text-white px-6 py-3 rounded-lg hover:bg-[#005a7a] transition-colors font-medium"
          >
            {({ loading }: { loading: boolean }) =>
              loading ? (
                'Generating PDF...'
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Download PDF
                </>
              )
            }
          </PDFDownloadLink>
        </div>

        {/* PDF Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-[#05092B] mb-4">Preview</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <PDFViewer width="100%" height={800} showToolbar={false}>
              <InvestorNewsletter />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}
