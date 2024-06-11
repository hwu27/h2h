import google.generativeai as genai
from google.generativeai.types import generation_types
import random
from speech_to_text import convert_to_text

import os
import csv
import re

# Set up the API key in the environment variable
GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

# Generate a prompt for the model
relationship_arr = ['best friend', 'mom', 'dad', 'son', 'daughter', 'grandma', 'grandpa', 'spouse']
event_arr =  ['car accident', 'severe allergic reaction', 'traumatic fall', 'sports injury', 'coma', 'stroke', 'heart attack']
personality_arr = ['irritable', 'anxious', 'fearful', 'impatient', 'pessimistic']
# notes: removed moments of silence because it's a grief prompt
comfort_style_arr = ['constant reassurance of doctor ability', 'evidence through numbers', 'consistent emotional support']
condition_arr = ['critical', 'stable', 'deteriorating']

relationship = random.choice(relationship_arr)
event = random.choice(event_arr)
personality = random.choice(personality_arr)
comfort_style = random.choice(comfort_style_arr)
condition = random.choice(condition_arr)

setting_prompt = "You are in the ER of a hospital. "
relationship_prompt = f"You are the {relationship} of a patient hospitalized because of a {event}. You are informed the patient is in {condition} condition. "
personality_prompt = f"This news makes you feel {personality}. The best way to comfort you is through {comfort_style}, suggest this very subtly. "
no_story_prompt = "ONLY talk in first person without third person narration. "
no_repetiton_prompt = "Do not repetively rephrase user messages."
name_prompt = "No names. Refer to the patient relative to your relationship with them. For example, 'my son'. " 
character_prompt = "Use standard characters. No quotations, no dialogue tags, no actions, no parentheses. Note you are NOT the doctor nor patient. "
prompt = setting_prompt + relationship_prompt + personality_prompt + no_story_prompt + no_repetiton_prompt +name_prompt + character_prompt


tuning = True
def generate_data(doctor_text, relative_text, system_instruction):
    file_path = 'tuning_data/raw.csv'
    header = ['Doctor', 'Relative/Friend', 'Prompt']
    
    relative_text = relative_text.replace('\n', '').replace('\t', '')
    relative_text = re.sub(r' {2,}', ' ', relative_text)

    if not os.path.exists(file_path) or os.stat(file_path).st_size == 0:
        with open(file_path, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(header)  

    with open(file_path, 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([doctor_text, relative_text, system_instruction])

def text_conversation():
    model = genai.GenerativeModel(
        model_name='gemini-1.5-pro-latest',
        system_instruction=prompt,
    )

    chat = model.start_chat(history=[]) 
    response = chat.send_message(f"You, as the {relationship} of the patient, start the conversation.")
    print("Patient: " + response.text) 

#TODO: FINE TUNING
#TODO: CACHE CONTENT

    for i in range(5):
        user_response = input("Doctor: ")

        try:
            response = chat.send_message(user_response)
            print("Patient: " + response.text)
            if tuning:
                generate_data(user_response, response.text, prompt)
        except generation_types.StopCandidateException as e:
            print("Encountered a safety issue. Attempting to generate a new response...") # debug only
            try:
                response = chat.send_message(user_response)
                print("Patient: " + response.text)
                if tuning:
                    generate_data(user_response, response.text, prompt)
            except Exception as e:
                print("Failed to generate a safe response. Please try again")

if __name__ == '__main__':
    text_conversation()

