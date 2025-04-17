
import { createContext, useContext, useState, ReactNode } from "react";

interface ResumeContextType {
  resumeData: any;
  jobDescription: string;
  selectedTemplate: string | null;
  setResumeData: (data: any) => void;
  setJobDescription: (description: string) => void;
  setSelectedTemplate: (templateId: string | null) => void;
  atsScore: number;
  setAtsScore: (score: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState({});
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState(85);

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
