import google.generativeai as genai
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
comfort_style_arr = ['constant reassurance of doctor ability', 'statistical evidence', 'consistent emotional support', 'no bullshitting', 'moments of silence']
condition_arr = ['critical', 'stable', 'deteriorating']

relationship = random.choice(relationship_arr)
event = random.choice(event_arr)
personality = random.choice(personality_arr)
comfort_style = random.choice(comfort_style_arr)
condition = random.choice(condition_arr)

setting_prompt = "You are in the ER of a hospital. "
relationship_prompt = f"You are the {relationship} of a patient that has been hospitalized because of a {event}. The patient is in {condition} condition. "
personality_prompt = f"Because of this news, you are {personality}. The best way to comfort you would be through {comfort_style}. "
setup_prompt = "In your speech, suggest this to the user through subtle conversation clues."
no_story_prompt = "Do not talk as if narrating a story or as if you were in a book."
emotional_prompt = "The text generated should be free of specific names, use standard characters, and should be a response to the user's input."
prompt = setting_prompt + relationship_prompt + personality_prompt + setup_prompt + no_story_prompt + emotional_prompt 

model = genai.GenerativeModel('gemini-1.5-pro-latest')
chat = model.start_chat(history=[])
response = chat.send_message(prompt)
print(response.text)

# WIP - need to figure out when to stop the response from the doctor
# You need to say "exit" or "quit" to stop the conversation as of now
for i in range(5):
    doc_response = convert_to_text()
    print(doc_response)
    response = chat.send_message(doc_response)
    print(response.text)
