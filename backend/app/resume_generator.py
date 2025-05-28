from transformers import pipeline

generator = pipeline("text-generation", model="gpt2")

def generate_resume(prompt):
    resume_text = generator(prompt, max_length=256, num_return_sequences=1)[0]['generated_text']
    return resume_text
