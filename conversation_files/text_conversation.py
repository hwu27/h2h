import google.generativeai as genai
from google.generativeai.types import generation_types
import random
from speech_to_text import convert_to_text
import os

# Set up the API key in the environment variable
GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

# Generate a prompt for the model
relationship_arr = ['best friend', 'mom', 'dad', 'son', 'daughter', 'grandma', 'grandpa', 'spouse']
event_arr =  ['car accident', 'severe allergic reaction', 'traumatic fall', 'sports injury', 'coma', 'stroke', 'heart attack']
personality_arr = ['irritable', 'anxious', 'fearful', 'impatient', 'pessimistic']
# notes: removed moments of silence because it's a greif prompt
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

def text_conversation():
    model = genai.GenerativeModel(
        model_name='gemini-1.5-pro-latest',
        system_instruction=prompt,
    )

    chat = model.start_chat(history=[]) 
    response = chat.send_message("What do you like to know about the patient?")
    print("Patient: " + response.text) 

#TODO: FINE TUNING
#TODO: CACHE CONTENT

    for i in range(5):
        user_response = input("Doctor: ")

        try:
            response = chat.send_message(user_response)
            print("Patient: " + response.text)
        except generation_types.StopCandidateException as e:
            print("Encountered a safety issue. Attempting to generate a new response...") # debug only
            try:
                response = chat.send_best_effort_message(user_response)
                print("Patient: " + response.text)
            except Exception as e:
                print("Failed to generate a safe response.")

if __name__ == '__main__':
    text_conversation()

