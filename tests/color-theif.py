from PIL import Image
from colorthief import ColorThief

image_path = '../assets/img/background.jpg'
color_thief = ColorThief(image_path)

primary_color = color_thief.get_color(quality=1)

palette = color_thief.get_palette(color_count=2)
secondary_color = palette[1]

print(primary_color, secondary_color)