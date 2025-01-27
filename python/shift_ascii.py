import sys

def shift_ascii(string, shift):
    # Shift ascii code in strings to hide the inforamtion.
    shifted_chars = []
    for char in string:
        shifted_char = chr(ord(char) + shift)
        shifted_chars.append(shifted_char)

    return ''.join(shifted_chars)

# for date in range(20250105, 20250132):
#     print("'%s': [], // %d: " % (shift_ascii(str(date), 3), date))

if __name__ == '__main__':
    orig_strings = sys.argv[1:]
    shifted_strings = ''
    for orig_str in orig_strings:
        shifted_str = shift_ascii(orig_str, 3).replace('\\', '\\\\').replace('\'', '\\\'')
        shifted_strings += "'" + shifted_str + "', "
    print(shifted_strings + '0, 6, // ' + ' | '.join(orig_strings))
