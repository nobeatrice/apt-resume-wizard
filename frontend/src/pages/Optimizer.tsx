import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { useToast } from "@/components/ui/use-toast"; // Assuming you have a toast component

export default function Optimizer() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume(); // Access resumeData and setResumeData
  const { toast } = useToast(); // Access the toast function

  // Get jobDescription from context - assuming it's set in Builder.tsx
  // If you want to input job description here, you'll need a state for it
  const jobDescription = resumeData.jobDescription; // Make sure this is available in your context

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      // Optional: Add file type and size validation here
      setFile(uploadedFile);
      // Clear previous results when a new file is uploaded
      setResumeData({
          ...resumeData,
          atsScore: null,
          atsSuggestions: [],
          parsedFields: null,
          optimizedResumeUrl: null, // Clear previous URL
      });
    }
  }, [setResumeData, resumeData]); // Add dependencies

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUploadComplete = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a resume file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription) {
         toast({
            title: "Job Description Missing",
            description: "Please provide a job description first.",
            variant: "destructive",
        });
        // Optionally, navigate to the Builder page or show an input field here
        return;
    }


    setIsProcessing(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_desc', jobDescription); // Append job description

    try {
      // Call the new unified backend endpoint
      const response = await fetch('/optimize-full', {
        method: 'POST',
        body: formData,
        // The browser will automatically set Content-Type to multipart/form-data
      });

      if (!response.ok) {
        // Attempt to read the error response body if available
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.detail || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();

      // Update ResumeContext with ALL relevant data, including the new URL
      setResumeData({
        ...resumeData, // Keep existing data
        atsScore: result.score,
        atsSuggestions: result.suggestions,
        parsedFields: result.parsed_fields,
        optimizedResumeUrl: result.optimized_resume_url, // Store the generated resume URL
      });

      toast({
        title: "Optimization Complete",
        description: "Your resume has been optimized.",
      });

      // Navigate directly to the ATS Checker page
      navigate('/ats-checker');

    } catch (error: any) { // Catch errors and display a toast
      console.error("Optimization Error:", error);
      toast({
        title: "Optimization Error",
        description: `There was a problem optimizing your resume: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <section className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-zinc-800 mb-4">
            Optimize Your Existing Resume
          </h1>
          <p className="text-lg text-zinc-600 mb-8">
            Upload your current resume (PDF, DOC, DOCX) and we'll help you
            tailor it to a specific job description using ATS best practices.
          </p>

          {/* File Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-zinc-300 hover:border-zinc-400"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-zinc-500 mb-4">
              <Upload size={48} className="mx-auto" />
              <p className="mt-2">
                {isDragActive
                  ? "Drop the files here ..."
                  : "Drag 'n' drop your resume here, or click to select files"}
              </p>
            </div>
            {file && (
              <div className="mt-4 text-zinc-700 flex items-center justify-center">
                <FileText size={20} className="mr-2" />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          {/* Optimize Button */}
          {file && ( // Show button only if a file is selected
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleUploadComplete}
                className="bg-[#77BDC6] hover:bg-[#67ADB7] text-white px-8"
                disabled={isProcessing || !jobDescription} // Disable if processing or no job_desc
              >
                {isProcessing ? "Processing..." : "Optimize Resume"}
              </Button>
            </div>
          )}

          {/* Privacy Assurance */}
          <div className="mt-8 text-zinc-600 text-sm flex items-center justify-center">
            <AlertCircle size={16} className="mr-2" />
            Your resume and job description are processed securely and are not
            stored after optimization.
          </div>
        </div>
      </section>
    </Layout>
  );
}
