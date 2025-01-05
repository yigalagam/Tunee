import sys

def shift_ascii(string, shift):
    # Shift ascii code in strings to hide the inforamtion.
    shifted_chars = []
    for char in string:
        shifted_char = chr(ord(char) + shift)
        shifted_chars.append(shifted_char)

    return ''.join(shifted_chars)

for date in range(20250105, 20250132):
    print("'%s': [], // %d: " % (shift_ascii(str(date), 3), date))

if __name__ == '__main__':
    orig_strings = ', '.join(sys.argv[1:])
    shifted_strings = ', '.join([shift_ascii(arg, 3) for arg in sys.argv[1:]])
    print(orig_strings)
    print(shifted_strings)
