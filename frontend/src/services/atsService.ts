
interface ResumeOptimizationRequest {
  job_description: string;
  resume_content?: string;
  skills?: string;
  experience?: string;
  education?: string;
  certifications?: string;
  career_objective?: string;
}

interface ResumeOptimizationResponse {
  score: number;
  optimized_resume: {
    skills: string;
    responsibilities: string;
    certification_skills: string;
    [key: string]: any;
  };
  ats_keywords: string[];
}

export const optimizeResume = async (formData: ResumeOptimizationRequest): Promise<ResumeOptimizationResponse> => {
  try {
    // This URL should be configured in an environment variable in a production app
    const response = await fetch('http://localhost:5000/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error optimizing resume:", error);
    // For demo purposes, return mock data when the API is not available
    return {
      score: 85,
      optimized_resume: {
        skills: "Project Management, UX Design, Adobe Suite, Leadership",
        responsibilities: "Led cross-functional teams to deliver product features on time and within budget",
        certification_skills: "PMP, Agile, SCRUM Master"
      },
      ats_keywords: ["Project Management", "UX Design", "Adobe Suite", "Agile"]
    };
  }
}
