import os.path
from demo_opts import get_device
from PIL import Image
from events import keypress
from display import screensaver
from display import menu
#from read import rfid_detect
import hashlib
from pyfingerprint.pyfingerprint import PyFingerprint


## Search for a finger
##

if __name__ == "__main__":
## Tries to initialize the sensor
    try:
        f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
        print('hello')

        if ( f.verifyPassword() == False ):
            raise ValueError('The given fingerprint sensor password is wrong!')

    except Exception as e:
        print('The fingerprint sensor could not be initialized!')
        print('Exception message: ' + str(e))
        exit(1)

    device = get_device()
    while(True):
        # if(rfid_detect()):
            #   rfid_callback()

        if(f.readImage()):
            menu(device)
        screensaver(device)
