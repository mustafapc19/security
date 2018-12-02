import os.path
from PIL import Image
from luma.core.virtual import terminal


def screensaver(device):
    img_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), 'images', 'edhal.png'))
    logo = Image.open(img_path).convert("RGBA")
    fff = Image.new(logo.mode, logo.size, (0,) * 4)

    background = Image.new("RGBA", device.size, "black")
    posn = ((device.width - logo.width) // 2, 0)

    while(True):
        rot = logo.rotate(0, resample=Image.BILINEAR)
        img = Image.composite(rot, fff, rot)
        background.paste(img, posn)
        device.display(background.convert(device.mode))


def menu(device):
    while(True):
        term = terminal(device)
        term.println("Welcome")