import os.path
from demo_opts import get_device
from PIL import Image
from events import keypress
from display import screensaver
from display import menu
#from read import rfid_detect


if __name__ == "__main__":

    device = get_device()
    while(True):
        # if(rfid_detect()):
            #   rfid_callback()
        screensaver(device)
        if(keypress()):
            menu(device)
