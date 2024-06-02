import google.generativeai as genai
import random
from speech_to_text import convert_to_text
from text_to_speech import synthesize_and_play_speech
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

setting_prompt = "You are in the ER of a hospital. Note you are not the doctor or the patient."
relationship_prompt = f"You are the {relationship} of a patient hospitalized because of a {event}. The patient is in {condition} condition. "
personality_prompt = f"Because of this news, you are {personality}. The best way to comfort you would be through {comfort_style}. "
no_story_prompt = "ONLY talk in first person without third person narration. "
no_repetiton_prompt = "Do not repetitively rephrase messages from both sides."
name_prompt = "No names. Refer to the patient relative to your relationship with them. For example, 'my son'. " 
character_prompt = "Use standard characters. No quotes, no dialogue tags, no actions, no parentheses. You voice your concerns to the doctor."
prompt = setting_prompt + relationship_prompt + personality_prompt + no_story_prompt + no_repetiton_prompt +name_prompt + character_prompt

convert_prompt = "Convert this emotional response to SSML to be used by the Google Text-To-Speech API. "
emotion_prompt = "The SSML should be manipulated in a way that shows emotion, pausing, etc to imitate real world tense/stressful scenarios based on the provided response. "
gen_prompt = "Do not generate anything else other than the SSML. Do not explain or anything. Do exactly as told."
ssml_example_prompt = """ Example: 
    <speak>
        <prosody pitch="+5%" rate="fast" volume="+3dB">
            I can't believe this is happening. 
            <break time="500ms"/>
            Everything is just too much right now!
        </prosody>
        <emphasis level="strong">Please help me!</emphasis>
    </speak>
    """
ssml_prompt = convert_prompt + emotion_prompt + gen_prompt + ssml_example_prompt

def speech_conversation():
    conversation_model = genai.GenerativeModel('gemini-1.5-pro-latest')
    chat = conversation_model.start_chat(history=[])
    response = chat.send_message(prompt)
    
    ssml_model = genai.GenerativeModel('gemini-1.5-pro-latest')
    ssml_response = ssml_model.generate_content(response.text + ssml_prompt)
    #print("Ssml: " + ssml_response.text)
    print("Patient: " + response.text)
    synthesize_and_play_speech(ssml_response.text)

    for i in range(5):
        # Convert the doctor's response to text
        doc_response = convert_to_text() # For speech-to-text purposes
        # doc_response = input("Doctor: ") # For texting purposes
        print(doc_response)

        # Generate the patient's response and convert to to SSML
        response = chat.send_message(doc_response + "[This part is not part of the response prompt. Reminder: {no_story_prompt} {settomg_prompt} {relationship_prompt}")
        print("Patient: " + response.text) 
        ssml_response = ssml_model.generate_content(response.text + ssml_prompt)
        #print("Ssml: " + ssml_response.text)
        synthesize_and_play_speech(ssml_response.text)

if __name__ == '__main__':
    speech_conversation()