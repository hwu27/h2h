import os
from google.cloud import texttospeech
import pygame

def synthesize_and_play_speech(ssml_text, output_filename="output.mp3"):
    """ Synthesize the SSML text and play the audio file using pygame"""

    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.SynthesisInput(ssml=ssml_text)

    # Select the type of voice request (language code, name, and gender)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Wavenet-C"
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech request on the SSML input
    response = client.synthesize_speech(
        input=input_text,
        voice=voice,
        audio_config=audio_config
    )

    # Write the response to a temporary MP3 file
    with open(output_filename, "wb") as out:
        out.write(response.audio_content)

    # Initialize pygame mixer
    pygame.mixer.init()
    pygame.mixer.music.load(output_filename)
    pygame.mixer.music.play()

    # Wait for the playback to finish
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(1)
    
    # Clean up
    pygame.mixer.quit()
    os.remove(output_filename)    

# Example usage
if __name__ == "__main__":
    ssml_text = """
    <speak>
        <prosody pitch="+5%" rate="fast" volume="+3dB">
            I can't believe this is happening. 
            <break time="500ms"/>
            Everything is just too much right now!
        </prosody>
        <emphasis level="strong">Please help me!</emphasis>
    </speak>
    """
    synthesize_and_play_speech(ssml_text)
