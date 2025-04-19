
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useResume } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";

const Optimizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { setResumeData } = useResume();
  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    }
  });

  const handleUploadComplete = async () => {
    if (!file) return;
    
    try {
      setIsProcessing(true);
      
      // In a real implementation, you would send this file to your Flask backend
      // For now, we'll simulate parsing a resume
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing delay
      
      // Mock resume data extraction
      const mockResumeData = {
        name: "John Smith",
        email: "john@example.com",
        phone: "555-123-4567",
        skills: ["Project Management", "UI/UX Design", "JavaScript", "React"],
        experience: [
          {
            title: "Senior Designer",
            company: "Design Co",
            startDate: "2020-01",
            endDate: "Present",
            description: "Led design projects for major clients"
          }
        ],
        education: [
          {
            institution: "University of Design",
            degree: "Bachelor of Fine Arts",
            graduationYear: "2018"
          }
        ]
      };
      
      // Store the extracted resume data in context
      setResumeData(mockResumeData);
      
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been successfully processed.",
      });
      
      // Navigate to builder to add job description
      navigate('/builder');
      
    } catch (error) {
      console.error("Error processing resume:", error);
      toast({
        title: "Upload Error",
        description: "There was a problem processing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 mb-4">
            Optimize Your Resume
          </h1>
          <p className="text-xl text-zinc-600 mb-8">
            Upload your existing resume and let us enhance it with AI optimization.
          </p>
          
          <div className="bg-zinc-800 rounded-lg p-8">
            <div 
              {...getRootProps()} 
              className={`
                border-2 border-dashed rounded-lg p-12 
                text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-[#77BDC6] bg-[#77BDC6]/10' : 'border-zinc-600'}
                ${file ? 'bg-[#77BDC6]/5' : ''}
              `}
            >
              <input {...getInputProps()} />
              
              {file ? (
                <div className="flex flex-col items-center">
                  <FileText className="w-16 h-16 text-[#77BDC6] mb-4" />
                  <p className="text-white text-lg mb-2">{file.name}</p>
                  <p className="text-zinc-400 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-16 h-16 text-[#77BDC6] mb-4" />
                  <p className="text-white text-lg mb-2">
                    {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    or click to browse (PDF, DOC, DOCX)
                  </p>
                </div>
              )}
            </div>
            
            {file && (
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleUploadComplete}
                  className="bg-[#77BDC6] hover:bg-[#67ADB7] text-white px-8"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Optimize Resume"}
                </Button>
              </div>
            )}
            
            <div className="mt-8 bg-zinc-700 rounded p-4 flex items-start">
              <AlertCircle className="text-[#77BDC6] w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">
                  Privacy Assurance
                </h3>
                <p className="text-zinc-300 text-sm">
                  Your resume data is only used for optimization purposes and is never shared with third parties.
                  All uploaded documents are automatically deleted after processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Optimizer;
