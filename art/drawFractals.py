from PIL import Image, ImageDraw
import matplotlib.cm

from multibrotSet import multibrot, MAX_ITER
from viewport import Viewport

def denormalize(palette):
    return [
        tuple(int(channel * 255) for channel in color)
        for color in palette
    ]

def paint(mandelbrot_set, viewport, palette, smooth):
    for pixel in viewport:
        stability = mandelbrot_set.stability(complex(pixel), smooth)
        index = int(min(stability * len(palette), len(palette) - 1))
        pixel.color = palette[index % len(palette)]

colormap = matplotlib.cm.get_cmap("twilight").colors
color_palette = denormalize(colormap)

# Image size (pixels)
WIDTH = 600
HEIGHT = 400

# Plot window
RE_START = -2
RE_END = 1
IM_START = -1
IM_END = 1

palette = []


for exponent in range(0, 100):
    im = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(im)
    for x in range(0, WIDTH):
        for y in range(0, HEIGHT):
            # Convert pixel coordinate to complex number
            c = complex(RE_START + (x / WIDTH) * (RE_END - RE_START),
                        IM_START + (y / HEIGHT) * (IM_END - IM_START))
            # Compute the number of iterations
            m = multibrot(c, (exponent/5.0))

            # The color depends on the number of iterations
            color = color_palette[m % len(color_palette)]
            # Plot the point
            draw.point([x, y], color)

    # im.show() # Uncomment this if you want to see the results of the flower before they are saved
    im.save('./nft_images/flower_'+ str(exponent) +'.png', 'PNG')