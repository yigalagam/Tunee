from scipy.io import wavfile
import numpy as np
import sys

# Crop a segment out of an audio file.


def crop_segment(input_file, output_file, start_time, end_time, fade_duration=None):

    # Read input audio file.
    sample_rate, sound = wavfile.read(input_file)

    dims = sound.shape
    if len(dims) == 1:
        # Convert to two channels.
        two_channels = np.zeros((dims[0], 2), dtype=sound.dtype)
        two_channels[:, 0] = sound
        two_channels[:, 1] = sound
        sound = two_channels

    start_sample = round(start_time * sample_rate)
    end_sample = round(end_time * sample_rate)
    cropped_sound = sound[start_sample:end_sample, :]

    # Apply fading.
    if fade_duration is not None:
        n_fade_samples = round(fade_duration * sample_rate)
        for i in range(0, n_fade_samples):
            # Fade in
            cropped_sound[i, :] = np.round(cropped_sound[i, :] * (i / n_fade_samples)).astype('int16')
            # Fade out
            cropped_sound[-(i + 1), :] = np.round(cropped_sound[-(i + 1), :] * (i / n_fade_samples)).astype('int16')

    # Save output wav file.
    wavfile.write(output_file, sample_rate, cropped_sound)


if __name__ == '__main__':
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    start_time = float(sys.argv[3])
    end_time = float(sys.argv[4])
    if len(sys.argv) > 5:
        fade_duration = float(sys.argv[5])
    else:
        fade_duration = None

    crop_segment(input_file, output_file, start_time, end_time, fade_duration)