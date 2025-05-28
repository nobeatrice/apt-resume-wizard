import pdfplumber
from pyresparser import ResumeParser

def parse_pdf_resume(pdf_file_path):
    # Extract text (optional, for debugging)
    text = ""
    with pdfplumber.open(pdf_file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    # Parse fields
    data = ResumeParser(pdf_file_path).get_extracted_data()
    return data
