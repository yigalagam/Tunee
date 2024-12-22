import os
import numpy as np
import matplotlib.pyplot as plt

# Create images to share on social media.
# Each image has a different timer result.

input_dir = '../../Javascript/musicle/python/'
output_dir = '../../Javascript/musicle/images/share'

for hh in range(1):
    for mm in range(60):
        for ss in range(60):
            img_data = plt.imread(os.path.join(input_dir, 'base_image.bmp')).copy()
            img_data = img_data[:245, 1:-1]

            hh_str = f'{hh:02d}'
            mm_str = f'{mm:02d}'
            ss_str = f'{ss:02d}'
            time_str = mm_str + ':' + ss_str

            # Save image with time data.
            print(time_str)
            fig, ax = plt.subplots()
            ax.imshow(img_data)
            plt.axis('off')
            plt.tight_layout(pad=0)
            txt = plt.text(0, 0, time_str)
            txt.set_fontname('Verdana')
            txt.set_fontsize(45)
            txt.set_fontweight('bold')
            txt.set_color('#5f5f5f')
            ax_width = ax.get_xlim()[1] - ax.get_xlim()[0]
            ax_height = ax.get_ylim()[0] - ax.get_ylim()[1]
            txt_dims = txt.get_window_extent().transformed(ax.transData.inverted()).get_points()
            txt_width = txt_dims[1][0] - txt_dims[0][0]
            txt_height = txt_dims[1][1] - txt_dims[0][1]
            txt.set_x((ax_width - txt_width) // 2)
            txt.set_y((ax_height - txt_height) // 2 + 24)
            plt.savefig(os.path.join(output_dir, time_str.replace(':', '_') + '.png'),
                        dpi=75, bbox_inches='tight', pad_inches=0)
            plt.close()

# Image for results over 1 hour.
img_data = plt.imread(os.path.join(input_dir, 'base_image_1_hour.bmp')).copy()
img_data = img_data[:119, 1:-1]
fig, ax = plt.subplots()
ax.imshow(img_data)
plt.axis('off')
plt.tight_layout(pad=0)
plt.savefig(os.path.join(output_dir, 'share.png'),
            dpi=75, bbox_inches='tight', pad_inches=0)
plt.close()



