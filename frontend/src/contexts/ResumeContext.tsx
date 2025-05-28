// frontend/src/contexts/ResumeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResumeData {
  jobDescription: string;
  atsScore: number | null;
  atsSuggestions: string[];
  parsedFields: any; // Adjust the type based on your parsed data structure
  optimizedResumeUrl: string | null; // Add the new field
  // Add other resume-related fields here
}

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    jobDescription: '',
    atsScore: null,
    atsSuggestions: [],
    parsedFields: null,
    optimizedResumeUrl: null, // Initialize the new field
    // Initialize other fields
  });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
