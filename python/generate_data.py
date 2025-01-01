from scipy.io import wavfile
import numpy as np
import sys

# Read an audio file and output it as a python script that returns two arrays and a sample rate.
# Add optional song data for sharing.


def audio_to_arrays(audio_file, output_file, song_title=None, youtube_id=None):
    sample_rate, sound = wavfile.read(audio_file)

    dims = sound.shape
    if len(dims) == 1:
        # Convert to two channels.
        two_channels = np.zeros((dims[0], 2), dtype=sound.dtype)
        two_channels[:, 0] = sound
        two_channels[:, 1] = sound
        sound = two_channels

    # Scamble data by negating and reversing.
    sound = -sound[::-1, :]

    with open(output_file, 'w') as fid:
        fid.write("function loadAudioDataByDate() {\n\treturn {\n\t\t'left':\n\t\t\t[")
        for i, value in enumerate(sound[:, 0]):
            fid.write(str(value))
            if i < dims[0] - 1:
                fid.write(',')
        fid.write("],\n\t\t'right':\n\t\t\t[")
        for i, value in enumerate(sound[:, 1]):
            fid.write(str(value))
            if i < dims[0] - 1:
                fid.write(',')
        fid.write("],\n\t\t'sampleRate': ")
        fid.write(str(sample_rate) + ',\n')
        
        if song_title is not None:
            fid.write("\t\t'songTitle': " + "'" + shift_ascii(song_title, 1) + "',\n")

        if youtube_id is not None:
            fid.write("\t\t'youtubeId': " + "'" + shift_ascii(youtube_id, 1) + "',\n")
                
        fid.write('\t}\n}\n')


def shift_ascii(string, shift):
    # Shift ascii code in strings to hide the inforamtion.
    shifted_chars = []
    for char in string:
        shifted_char = chr(ord(char) + shift)
        shifted_chars.append(shifted_char)
    return ''.join(shifted_chars)


if __name__ == '__main__':
    if len(sys.argv) > 3:
        song_title = sys.argv[3]
    else:
        song_title = None

    if len(sys.argv) > 4:
        youtube_id = sys.argv[4]
    else:
        youtube_id = None

    audio_to_arrays(sys.argv[1], sys.argv[2], song_title, youtube_id)
