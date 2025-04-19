
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";

const Builder = () => {
  const { jobDescription, setJobDescription } = useResume();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please enter a job description to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Store the job description and navigate to templates
    navigate("/templates");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 mb-2">
                Let's Match
              </h1>
              <p className="text-xl text-zinc-700 mb-4">
                your Resume to the Perfect Job
              </p>
            </div>
            <img 
              src="/lovable-uploads/5662b0df-41cf-46d8-8fa1-434092b637e3.png" 
              alt="AI assistant" 
              className="w-40 h-auto hidden md:block"
            />
          </div>
          
          <p className="text-lg text-zinc-600 mb-8">
            Paste the job description and type down your role —<br />
            we'll analyze the key skills and qualifications.
          </p>
          
          <div className="bg-zinc-800 rounded-lg p-6">
            <Textarea
              className="min-h-[200px] bg-white text-zinc-800 border-0 mb-4 placeholder:text-zinc-400"
              placeholder="Paste the description or tell us about the role you're applying for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleContinue}
                variant="secondary"
                className="px-8"
                disabled={!jobDescription.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Builder;
