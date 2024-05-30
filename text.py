import google.generativeai as genai
import random

GOOGLE_API_KEY = 'KEY'
genai.configure(api_key=GOOGLE_API_KEY)

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

prompt1 = "You are in the ER of a hospital. "
prompt2 = f"You are the {relationship} of a patient that has been hospitalized because of a {event}. The patient is in {condition} condition. "
prompt3 = f"Because of this news, you are {personality}. The best way to comfort you would be through {comfort_style}. "
prompt4= "In your speech, suggest this to the user through subtle conversation clues. Talk in first person only. Start off the conversation with the doctor: "

prompt = prompt1 + prompt2 + prompt3 + prompt4


model = genai.GenerativeModel('gemini-1.5-pro-latest')
chat = model.start_chat(history=[])
response = chat.send_message(prompt)
print(response.text)

for i in range(5):
    doc_response = input("Doctor (You): ")
    response = chat.send_message(doc_response)
    print(response.text)
