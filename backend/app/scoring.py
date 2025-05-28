# backend/app/scoring.py
import os
from dotenv import load_dotenv
import google.generativeai as genai # Import the Gemini library
import re

load_dotenv() # Load environment variables

# Use the environment variable for your Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

# Configure the generative AI model with your API key
genai.configure(api_key=GEMINI_API_KEY)

# Choose a Gemini model (e.g., 'gemini-pro') - you might explore others
model = genai.GenerativeModel('gemini-pro')


def get_gemini_completion(prompt: str):
    """Helper function to get completion from Gemini API."""
    try:
        response = model.generate_content(prompt)
        # Access the generated text
        return response.text.strip()
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None


def score_resume(parsed_data: dict, job_desc: str | None) -> float:
    """
    Scores the resume based on the job description using Gemini for analysis.
    """
    if not job_desc or not parsed_data or not parsed_data.get('full_text'):
        return 0.0

    resume_text = parsed_data.get('full_text')

    # Use Gemini to analyze relevance
    prompt = f"""Analyze the following resume against the job description and provide a relevance score out of 100.
    Also, identify key areas of alignment and misalignment.

    Job Description:
    {job_desc}

    Resume:
    {resume_text}

    Provide the output in a structured format, for example:
    Score: XX/100
    Alignment: ...
    Misalignment: ...
    """

    analysis_result = get_gemini_completion(prompt)

    if analysis_result:
        # Extract score using regex or string manipulation
        score_match = re.search(r"Score: (\d+)/100", analysis_result)
        if score_match:
            try:
                score = int(score_match.group(1))
                return float(score)
            except ValueError:
                pass # Handle cases where conversion fails

    # Fallback to basic scoring if Gemini call fails or score extraction fails
    return basic_score_resume(parsed_data, job_desc) # Implement a basic fallback score


def basic_score_resume(parsed_data: dict, job_desc: str | None) -> float:
     """Basic fallback scoring based on keyword matching."""
     if not job_desc or not parsed_data or not parsed_data.get('full_text'):
         return 0.0

     job_desc_lower = job_desc.lower()
     resume_text_lower = parsed_data.get('full_text', '').lower()

     score = 0
     job_keywords = [k.strip() for k in job_desc_lower.split(',') if k.strip()]

     for keyword in job_keywords:
         if keyword in resume_text_lower:
             score += 1

     max_possible_score = len(job_keywords) if job_keywords else 1
     calculated_score = (score / max_possible_score) * 100

     return min(calculated_score, 100.0)


def generate_suggestions(score: float | None, parsed_data: dict | None = None, job_desc: str | None = None) -> list[str]:
    """
    Generates suggestions using Gemini based on score, resume, and job description.
    """
    suggestions = []

    if score is None:
         suggestions.append("Upload a job description to get an ATS score and tailored suggestions.")
         return suggestions

    # Basic suggestions based on score (can still be useful)
    if score < 50:
        suggestions.append("Your resume's alignment with the job description is low. Consider adding more keywords from the job description.")
    elif score < 75:
        suggestions.append("Good alignment, but there's room for improvement. Review the job description for any missed keywords or requirements.")
    else:
        suggestions.append("Your resume shows strong alignment with the job description!")


    # Use Gemini for more detailed suggestions if resume data and job description are available
    if parsed_data and job_desc and parsed_data.get('full_text'):
        resume_text = parsed_data.get('full_text')

        prompt = f"""Analyze the following resume and job description. Provide specific, actionable suggestions to improve the resume's alignment with the job description.
        Focus on missing keywords, areas to expand on experience, and skills to highlight.
        Provide suggestions as a bulleted list.

        Job Description:
        {job_desc}

        Resume:
        {resume_text}
        """

        gemini_suggestions_text = get_gemini_completion(prompt)

        if gemini_suggestions_text:
            # Split the Gemini response into a list of suggestions
            # This might require parsing bullet points or numbered lists
            # For simplicity, let's assume each line is a suggestion
            gemini_suggestions = [s.strip() for s in gemini_suggestions_text.split('\n') if s.strip()]
            suggestions.extend(gemini_suggestions)
        else:
             suggestions.append("Could not generate detailed suggestions at this time.")


    return suggestions
