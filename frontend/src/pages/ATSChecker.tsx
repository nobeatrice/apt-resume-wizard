// frontend/src/pages/ATSChecker.tsx
import { useState } from "react"; // Import useState
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useResume } from "@/contexts/ResumeContext"; // Import useResume
import { ChevronLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ATSChecker = () => {
  const { resumeData } = useResume(); // Access resumeData from context
  const { atsScore, atsSuggestions, optimizedResumeUrl } = resumeData; // Destructure relevant data
  const navigate = useNavigate();

  const [isLoadingPreview, setIsLoadingPreview] = useState(true); // Add loading state for image

  const handleGoBack = () => {
    navigate('/builder'); // Navigate back to the builder page
  };

  // Function to handle download - simply navigate to the URL
  const handleDownload = () => {
    if (optimizedResumeUrl) {
      window.location.href = optimizedResumeUrl;
    }
  };

  return (
    <Layout>
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Suggestions and Score */}
          <div className="lg:col-span-3">
            <Button
              variant="outline"
              className="mb-6 flex items-center"
              onClick={handleGoBack}
            >
              <ChevronLeft size={16} className="mr-2" />
              Back to Suggestions
            </Button>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">ATS Score</h2>
              {atsScore !== null ? (
                <p className="text-4xl font-bold text-[#77BDC6]">
                  {atsScore.toFixed(2)}%
                </p>
              ) : (
                <p className="text-zinc-600">Score not available.</p>
              )}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">
                Optimization Suggestions
              </h2>
              {atsSuggestions.length > 0 ? (
                <ul className="list-disc list-inside text-zinc-700">
                  {atsSuggestions.map((suggestion, index) => (
                    <li key={index} className="mb-2">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-600">No suggestions available.</p>
              )}
            </div>
          </div>

          {/* Right Column: Resume Preview and Download */}
          <div className="lg:col-span-9">
            <div className="bg-zinc-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Resume Preview</h2>

              {/* Resume Preview */}
              {isLoadingPreview && optimizedResumeUrl && (
                  // Optional: Show a loading indicator while image loads
                  <div className="flex justify-center items-center h-96 bg-white rounded-sm">
                      <p className="text-zinc-600">Loading Preview...</p>
                  </div>
              )}
              {/* Conditional rendering for the preview based on optimizedResumeUrl */}
              {optimizedResumeUrl ? (
                <img
                  src={optimizedResumeUrl}
                  alt="Optimized Resume Preview"
                  className="w-full h-auto bg-white shadow-lg rounded-sm"
                  onLoad={() => setIsLoadingPreview(false)} // Hide loading when image loads successfully
                  onError={() => {
                      setIsLoadingPreview(false);
                      // You might want to show an error message or a broken image icon
                      console.error("Failed to load optimized resume preview");
                  }}
                />
              ) : (
                // Fallback or initial placeholder if no optimized URL is available
                <div className="flex justify-center items-center h-96 bg-white rounded-sm">
                     <p className="text-zinc-600">Optimized resume preview not available.</p>
                </div>
              )}


              {/* Download Button */}
              {optimizedResumeUrl && ( // Only show download if URL is available
                <Button
                  className="w-full bg-zinc-200 text-zinc-800 hover:bg-zinc-300 mt-4 flex items-center justify-center"
                  onClick={handleDownload}
                >
                  <Download size={20} className="mr-2" /> Download Optimized Resume
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ATSChecker;
