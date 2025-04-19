
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useResume } from "@/contexts/ResumeContext";
import { useToast } from "@/hooks/use-toast";

const ATSChecker = () => {
  const { 
    atsScore, 
    optimizeResumeWithAI, 
    isOptimizing,
    atsKeywords, 
    optimizedSections 
  } = useResume();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const runOptimization = async () => {
      try {
        // Only run if it hasn't been optimized yet
        if (!optimizedSections) {
          await optimizeResumeWithAI();
        }
      } catch (error) {
        toast({
          title: "Optimization Error",
          description: "There was an error optimizing your resume. Using demo data instead.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    runOptimization();
  }, [optimizeResumeWithAI, optimizedSections, toast]);

  // Determine score color
  const getScoreColor = () => {
    if (atsScore >= 80) return "text-[#77BDC6]";
    if (atsScore >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  // Determine score message
  const getScoreMessage = () => {
    if (atsScore >= 80) return "Great match!";
    if (atsScore >= 60) return "Good match, needs improvement";
    return "Needs significant improvement";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/editor" className="flex items-center text-zinc-700 mb-6 hover:text-zinc-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Return
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-zinc-800 rounded-lg p-6">
              <div className="text-center mb-4">
                <h2 className="text-white text-lg font-medium mb-2">Score</h2>
                <div className={`${getScoreColor()} text-6xl font-bold mb-2`}>
                  {isLoading ? "..." : `${atsScore}%`}
                </div>
                <p className="text-white text-sm">{getScoreMessage()}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white text-base font-medium mb-2">Complied with</h3>
                <div className="bg-zinc-700 rounded p-3 mb-4">
                  <h4 className="text-white text-sm font-medium mb-1">Skills</h4>
                  <p className="text-zinc-300 text-xs">
                    {isLoading ? "Analyzing..." : 
                      atsKeywords?.slice(0, 3).join(", ") || "Project Management, UX Design, Adobe Suite etc."}
                  </p>
                </div>
                <div className="bg-zinc-700 rounded p-3">
                  <h4 className="text-white text-sm font-medium mb-1">Experience</h4>
                  <p className="text-zinc-300 text-xs">
                    {isLoading ? "Analyzing..." : 
                      (optimizedSections?.experience_match || "Multiple experience sources")}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white text-base font-medium mb-2">Suggestions</h3>
                <div className="bg-zinc-700 rounded p-3">
                  <h4 className="text-white text-sm font-medium mb-1">Skills</h4>
                  <p className="text-zinc-300 text-xs">
                    {isLoading ? "Generating..." : 
                      (optimizedSections?.skills || "Add UX skills such as Agility, Collaboration and more!")}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white text-base font-medium mb-2">Tips</h3>
                <p className="text-zinc-300 text-xs">
                  {isLoading ? "Analyzing your resume..." : 
                    (optimizedSections?.tips || "Try action words like \"led,\" \"Developed\" or \"Executed\" for a stronger impact")}
                </p>
              </div>
              
              <Button className="w-full bg-zinc-200 text-zinc-800 hover:bg-zinc-300">
                Download
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-9">
            <div className="bg-zinc-800 rounded-lg p-6">
              <img 
                src="/lovable-uploads/3b52bb20-765d-4ec6-908a-4defa9092f87.png" 
                alt="Resume Preview"
                className="w-full h-auto bg-white shadow-lg rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ATSChecker;
