from scipy.io import wavfile
import numpy as np
import sys

# Read an audio file and output it as a python script that returns two arrays and a sample rate.


def audio_to_arrays(audio_file, output_file):
    sample_rate, sound = wavfile.read(audio_file)

    dims = sound.shape
    if len(dims) == 1:
        # Convert to two channels.
        two_channels = np.zeros((dims[0], 2), dtype=sound.dtype)
        two_channels[:, 0] = sound
        two_channels[:, 1] = sound
        sound = two_channels

    with open(output_file, 'w') as fid:
        fid.write('return [[[]')
        for i, value in enumerate(sound[:, 0]):
            fid.write(str(value))
            if i < dims[0] - 1:
                fid.write(',')
        fid.write('],\n[')
        for i, value in enumerate(sound[:, 0]):
            fid.write(str(value))
            if i < dims[0] - 1:
                fid.write(',')
        fid.write(']], ')
        fid.write(str(sample_rate) + ']\n')




if __name__ == '__main__':
    audio_to_arrays(sys.argv[1], sys.argv[2])