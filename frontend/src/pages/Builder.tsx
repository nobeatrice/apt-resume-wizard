// frontend/src/pages/Builder.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Assuming you use a Textarea component
import { useResume } from "@/contexts/ResumeContext"; // Import useResume
import { ArrowRight } from "lucide-react";

const Builder = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume(); // Access resumeData and setResumeData
  const [localJobDescription, setLocalJobDescription] = useState(resumeData.jobDescription || ''); // Local state for input

  // Update local state and context on input change
  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalJobDescription(e.target.value);
    // Optionally, update context on every change, or only on continue
    // setResumeData({ ...resumeData, jobDescription: e.target.value });
  };

  const handleContinue = () => {
    // Update jobDescription in context when continuing
    setResumeData({ ...resumeData, jobDescription: localJobDescription });
    // Navigate to the Optimizer page
    navigate('/optimizer');
  };

  return (
    <Layout>
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-zinc-800 mb-4">
            Provide Job Description
          </h1>
          <p className="text-lg text-zinc-600 mb-8">
            Paste the job description here to help us tailor your resume.
          </p>

          {/* Job Description Input */}
          <div className="mb-6">
            <Textarea
              placeholder="Paste the job description here..."
              rows={10}
              value={localJobDescription}
              onChange={handleJobDescriptionChange}
              className="w-full rounded-md border-zinc-300 shadow-sm focus:border-[#77BDC6] focus:ring-[#77BDC6]"
            />
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              className="bg-[#77BDC6] hover:bg-[#67ADB7] text-white px-8"
              disabled={!localJobDescription.trim()} // Disable if input is empty
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Builder;
