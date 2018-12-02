import os.path
from PIL import Image
from luma.core.virtual import terminal
from events import keypress
import time


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
    t_end = time.time() + 10
    selected_option = 0
    while(time.time() < t_end):
        term = terminal(device)
        term.println("Welcome")
        key = keypress()
        if(key):
            continue
