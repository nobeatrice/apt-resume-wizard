from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from app.models import ResumeData # Assuming ResumeData model is appropriate
from app.scoring import score_resume, generate_suggestions
from app.pdf_parser import parse_pdf_resume
# Import reportlab components
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
import tempfile
import os
import uuid # To generate unique file IDs

app = FastAPI()

# Dictionary to store temporary file paths with unique IDs
# In a real application, use a more persistent and scalable storage
temp_files = {}

# Helper function to generate PDF (using reportlab)
def generate_optimized_resume_pdf(parsed_data: dict, job_desc: str, suggestions: list, output_path: str):
    """
    Generates an optimized resume PDF using reportlab.
    This is a basic example, customize the layout and formatting as needed.
    """
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title and Contact Info (Example)
    name = parsed_data.get('name', 'Optimized Resume')
    email = parsed_data.get('email', '')
    phone = parsed_data.get('phone', '')
    address = parsed_data.get('address', '')

    story.append(Paragraph(name, styles['h1']))
    contact_info = f"{email} | {phone}"
    if address:
        contact_info += f" | {address}"
    story.append(Paragraph(contact_info, styles['Normal']))
    story.append(Spacer(1, 0.2 * inch))

    # Career Objective (Example)
    objective = parsed_data.get('career_objective', '')
    if objective:
        story.append(Paragraph("Career Objective", styles['h2']))
        story.append(Paragraph(objective, styles['Normal']))
        story.append(Spacer(1, 0.2 * inch))

    # Skills (Example)
    skills = parsed_data.get('skills', [])
    if skills:
        story.append(Paragraph("Skills", styles['h2']))
        # Join skills with commas for simplicity
        story.append(Paragraph(", ".join(skills), styles['Normal']))
        story.append(Spacer(1, 0.2 * inch))

    # Education (Example)
    # This is a very basic example, you'll need to handle multiple entries and details
    if parsed_data.get('educational_institution_name'):
         story.append(Paragraph("Education", styles['h2']))
         education_details = f"{parsed_data.get('degree_names', '')} from {parsed_data.get('educational_institution_name', '')}, {parsed_data.get('passing_years', '')}"
         story.append(Paragraph(education_details, styles['Normal']))
         story.append(Spacer(1, 0.2 * inch))

    # Experience (Example - Assuming flat structure from parsed data)
    # This is a very basic example, you'll need to handle multiple jobs, roles, and responsibilities
    if parsed_data.get('professional_company_names'):
        story.append(Paragraph("Experience", styles['h2']))
        experience_details = f"{parsed_data.get('positions', '')} at {parsed_data.get('professional_company_names', '')}"
        story.append(Paragraph(experience_details, styles['Normal']))
        story.append(Spacer(1, 0.2 * inch))


    # Optimization Suggestions (Example)
    if suggestions:
        story.append(Paragraph("Optimization Suggestions (Based on Job Description)", styles['h2']))
        # Use a list for suggestions
        list_items = []
        for suggestion in suggestions:
            list_items.append(Paragraph(suggestion, styles['Normal']))

        story.append(ListFlowable(list_items,
                                  bulletType='bullet',
                                  leading=15)
                    )
        story.append(Spacer(1, 0.2 * inch))


    # ATS Score (Example)
    score = score_resume(parsed_data, job_desc) # Recalculate score for display
    story.append(Paragraph(f"ATS Score: {score:.2f}", styles['h2']))


    # Build the PDF
    try:
        doc.build(story)
        print(f"Optimized resume PDF generated at: {output_path}")
    except Exception as e:
        print(f"Error building PDF: {e}")
        # Create an empty file or handle the error appropriately
        with open(output_path, 'w') as f:
             f.write(f"Error generating PDF: {e}")
        raise HTTPException(status_code=500, detail="Error generating optimized resume PDF.")


@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...), job_desc: str = Form(None)): # Make job_desc optional here
    """
    Uploads a resume, parses it, and provides initial score and suggestions.
    job_desc is optional at this stage.
    """
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        data = parse_pdf_resume(tmp_path)
        # Map fields to your ResumeData model or a dictionary
        resume_dict = {
            "address": data.get("address", ""),
            "career_objective": data.get("objective", ""),
            "skills": data.get("skills", []),
            "educational_institution_name": data.get("college_name", ""),
            "degree_names": data.get("degree", ""),
            "passing_years": data.get("graduation_year", ""),
            "educational_results": "",
            "result_types": "",
            "major_field_of_studies": data.get("degree", ""),
            "professional_company_names": ", ".join(data.get("company_names", [])),
            "start_dates": "",
            "end_dates": "",
            "related_skils_in_job": "",
            "positions": "",
            "locations": "",
            "responsibilities": "",
            "extra_curricular_activity_types": "",
            "extra_curricular_organization_names": "",
            "languages": data.get("languages", []),
            "proficiency_levels": [],
            "certification_providers": [],
            "certification_skills": [],
            "issue_dates": [],
            "expiry_dates": [],
            "job_position_name": "",
            "educationaL_requirements": "",
            "experiencere_requirement": "",
            "age_requirement": "",
            "skills_required": "",
        }
        score = score_resume(resume_dict, job_desc) if job_desc else None # Score is optional if no job_desc
        suggestions = generate_suggestions(score) if score is not None else []

        return JSONResponse({
            "score": score,
            "suggestions": suggestions,
            "parsed_fields": resume_dict
        })
    finally:
        os.unlink(tmp_path) # Clean up the temporary file

# New Unified Optimization Endpoint
@app.post("/optimize-full")
async def optimize_full(file: UploadFile = File(...), job_desc: str = Form(...)):
    """
    Uploads a resume and job description, performs full optimization,
    generates a PDF, and returns results and a download URL.
    """
    # 1. Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        # 2. Parse the resume
        parsed_data = parse_pdf_resume(tmp_path)

        # Map fields as in /upload_resume
        resume_dict = {
            "address": parsed_data.get("address", ""),
            "career_objective": parsed_data.get("objective", ""),
            "skills": parsed_data.get("skills", []),
            "educational_institution_name": parsed_data.get("college_name", ""),
            "degree_names": parsed_data.get("degree", ""),
            "passing_years": parsed_data.get("graduation_year", ""),
            "educational_results": "",
            "result_types": "",
            "major_field_of_studies": parsed_data.get("degree", ""),
            "professional_company_names": ", ".join(parsed_data.get("company_names", [])),
            "start_dates": "",
            "end_dates": "",
            "related_skils_in_job": "",
            "positions": "",
            "locations": "",
            "responsibilities": "",
            "extra_curricular_activity_types": "",
            "extra_curricular_organization_names": "",
            "languages": parsed_data.get("languages", []),
            "proficiency_levels": [],
            "certification_providers": [],
            "certification_skills": [],
            "issue_dates": [],
            "expiry_dates": [],
            "job_position_name": "",
            "educationaL_requirements": "",
            "experiencere_requirement": "",
            "age_requirement": "",
            "skills_required": "",
        }


        # 3. Perform scoring and get suggestions
        score = score_resume(resume_dict, job_desc)
        suggestions = generate_suggestions(score)

        # 4. Generate the optimized resume PDF
        # Create a temporary path for the generated PDF
        optimized_pdf_path = tempfile.mktemp(suffix=".pdf")
        generate_optimized_resume_pdf(resume_dict, job_desc, suggestions, optimized_pdf_path) # Implement this function

        # 5. Store the temporary PDF path with a unique ID
        file_id = str(uuid.uuid4())
        temp_files[file_id] = optimized_pdf_path

        # 6. Return the results and the download URL
        return JSONResponse({
            "score": score,
            "suggestions": suggestions,
            "parsed_fields": resume_dict, # Include parsed data as it might be useful
            "optimized_resume_url": f"/download-optimized-resume/{file_id}" # URL for download
        })

    except Exception as e:
        # Handle errors during processing
        print(f"Error during optimization: {e}")
        raise HTTPException(status_code=500, detail="Error processing resume optimization.")

    finally:
        # Clean up the temporary uploaded file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


# New Download Endpoint
@app.get("/download-optimized-resume/{file_id}")
async def download_optimized_resume(file_id: str):
    """
    Provides the generated optimized resume PDF for download.
    """
    # Retrieve the temporary file path using the ID
    file_path = temp_files.get(file_id)

    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Optimized resume not found.")

    # Return the file as a downloadable response
    # You might want to clean up the file after it's downloaded
    return FileResponse(
        path=file_path,
        filename="optimized_resume.pdf",
        media_type="application/pdf"
    )
