
import { createContext, useContext, useState, ReactNode } from "react";
import { optimizeResume } from "@/services/atsService";

interface ResumeContextType {
  resumeData: any;
  jobDescription: string;
  selectedTemplate: string | null;
  setResumeData: (data: any) => void;
  setJobDescription: (description: string) => void;
  setSelectedTemplate: (templateId: string | null) => void;
  atsScore: number;
  setAtsScore: (score: number) => void;
  atsKeywords: string[];
  setAtsKeywords: (keywords: string[]) => void;
  optimizedSections: {
    skills: string;
    responsibilities: string;
    certification_skills: string;
    [key: string]: any;
  } | null;
  setOptimizedSections: (sections: any) => void;
  optimizeResumeWithAI: () => Promise<void>;
  isOptimizing: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState({});
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState(85);
  const [atsKeywords, setAtsKeywords] = useState<string[]>([]);
  const [optimizedSections, setOptimizedSections] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizeResumeWithAI = async () => {
    if (!jobDescription.trim()) {
      console.error("Job description is required for optimization");
      return;
    }

    try {
      setIsOptimizing(true);
      
      // Extract resume data from the context
      const requestData = {
        job_description: jobDescription,
        resume_content: JSON.stringify(resumeData),
        skills: resumeData.skills?.join(", ") || "",
        experience: resumeData.experience?.map((exp: any) => 
          `${exp.title} at ${exp.company}: ${exp.description}`
        ).join(" ") || "",
        education: resumeData.education?.map((edu: any) => 
          `${edu.degree} at ${edu.institution}`
        ).join(" ") || "",
        certifications: resumeData.certifications?.join(", ") || "",
        career_objective: resumeData.objective || ""
      };

      const result = await optimizeResume(requestData);
      
      setAtsScore(result.score);
      setAtsKeywords(result.ats_keywords);
      setOptimizedSections(result.optimized_resume);
    } catch (error) {
      console.error("Error during resume optimization:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <ResumeContext.Provider 
      value={{
        resumeData,
        jobDescription,
        selectedTemplate,
        setResumeData,
        setJobDescription,
        setSelectedTemplate,
        atsScore,
        setAtsScore,
        atsKeywords,
        setAtsKeywords,
        optimizedSections,
        setOptimizedSections,
        optimizeResumeWithAI,
        isOptimizing
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  
  return context;
}
