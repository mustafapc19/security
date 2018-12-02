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


    rot = logo.rotate(0, resample=Image.BILINEAR)
    img = Image.composite(rot, fff, rot)
    background.paste(img, posn)
    device.display(background.convert(device.mode))


def wrapAround(target, length, flag):
    if(flag):
        if(target == length):
            target = 0
        else:
            target += 1
    else:
        if(target > 0):
            target -= 1
        else:
            target = length
    return target


def menu(device):
    t_end = time.time() + 10
    selected_option = 0
    length = 2
    term = terminal(device)
    term.println("Welcome")
    while(time.time() < t_end):
        key = keypress()
        if(key):
            if(key == 1):
                selected_option = wrapAround(selected_option, length, 1)
            elif(key == 2):
                selected_option = wrapAround(selected_option, length, 0)
        continue
