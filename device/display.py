import os.path
import logging
from PIL import Image,ImageFont, ImageDraw
from luma.core.virtual import terminal
from luma.oled.device import ssd1306, ssd1325, ssd1331, sh1106
from luma.core.interface.serial import i2c
from luma.core.render import canvas
from luma.core import cmdline, error
import RPi.GPIO as GPIO

global serial
global device

def init_display():
    try:
        global serial
        global device   
        serial = i2c(port=1, address=0x3C)
        device = ssd1306(serial, rotate=0)
        return True
    except Exception as e:
        return str(e)

global menuindex
menuindex=0

def invert(draw,x,y,text):
    font = ImageFont.load_default()
    draw.rectangle((x, y, x+120, y+10), outline=255, fill=255)
    draw.text((x, y), text, font=font, outline=0,fill="black")

def menu(index,menustr):
    global menuindex
    menustr = menustr
    font = ImageFont.load_default()
    with canvas(device) as draw:
        draw.rectangle(device.bounding_box, outline="white", fill="black")
        for i in range(len(menustr)):
            if( i == index):
                menuindex = i
                invert(draw, 2, i*10, menustr[i])
            else:
                draw.text((2, i*10), menustr[i], font=font, fill=255)
                
def menu_operation(strval):
        if ( strval == "option1"):
            with canvas(device) as draw:
                draw.rectangle(device.bounding_box, outline="white", fill="black")
                draw.text((10, 20), "Thank you", fill="white")
                draw.text((10, 30), "Keep following", fill="white")
        if ( strval == "option2"):
            with canvas(device) as draw:
                draw.rectangle(device.bounding_box, outline="white", fill="black")
                draw.text((10, 20), "Thank you", fill="white")
                draw.text((10, 30), "Keep following", fill="white")
        if ( strval == "option3"):
            with canvas(device) as draw:
                draw.rectangle(device.bounding_box, outline="white", fill="black")
                draw.text((10, 20), "Thank you", fill="white")
                draw.text((10, 30), "Keep following", fill="white")
        if ( strval == "option4"):
            with canvas(device) as draw:
                draw.rectangle(device.bounding_box, outline="white", fill="black")
                draw.text((10, 20), "Thank you", fill="white")
                draw.text((10, 30), "Keep following", fill="white")
        
def screensaver():
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


def welcome(message):
    term = terminal(device)
    term.println(message)

def draw_text(message,offwidth,offheight):
    with canvas(device) as draw:
        draw.rectangle(device.bounding_box, outline="white", fill="black")
        draw.text(((device.width - len(message))/4-offwidth, device.height/2-2-offheight), message, fill="white")


# logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)-15s - %(message)s'
)
# ignore PIL debug messages
logging.getLogger('PIL').setLevel(logging.ERROR)


def display_settings(args):
    """
    Display a short summary of the settings.

    :rtype: str
    """
    iface = ''
    display_types = cmdline.get_display_types()
    if args.display not in display_types['emulator']:
        iface = 'Interface: {}\n'.format(args.interface)

    lib_name = cmdline.get_library_for_display_type(args.display)
    if lib_name is not None:
        lib_version = cmdline.get_library_version(lib_name)
    else:
        lib_name = lib_version = 'unknown'

    import luma.core
    version = 'luma.{} {} (luma.core {})'.format(
        lib_name, lib_version, luma.core.__version__)

    return 'Version: {}\nDisplay: {}\n{}Dimensions: {} x {}\n{}'.format(
        version, args.display, iface, args.width, args.height, '-' * 60)


def get_device(actual_args=None):
    """
    Create device from command-line arguments and return it.
    """
    if actual_args is None:
        actual_args = sys.argv[1:]
    parser = cmdline.create_parser(description='luma.examples arguments')
    args = parser.parse_args(actual_args)

    if args.config:
        # load config from file
        config = cmdline.load_config(args.config)
        args = parser.parse_args(config + actual_args)

    print(display_settings(args))

    # create device
    try:
        device = cmdline.create_device(args)
    except error.Error as e:
        parser.error(e)

    return device

