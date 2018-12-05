from display import screensaver,welcome,menu
from rfid import read_rfid
import finger
import time
import RPi.GPIO as GPIO

clk = 11
dt = 12
sw = 13

GPIO.setmode(GPIO.BOARD)
GPIO.setup(clk, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(dt, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(sw, GPIO.IN, pull_up_down=GPIO.PUD_UP)
clkLastState = GPIO.input(clk)
global counter
counter = 0
global clickToggle 
clickToggle = False

def sw_callback(channel):
    global clickToggle
    global counter
    if(counter%4 == 0):
        clickToggle = True

GPIO.add_event_detect(sw, GPIO.FALLING , callback=sw_callback, bouncetime=300)  

try:
    while True:
        ret,hashval = finger.search()
        if ret:
            welcome("welcome akhil")
            menu(0)
            while True:
                if(clickToggle):
                    clickToggle = False
                    break
                else:
                    clkState = GPIO.input(clk)
                    dtState = GPIO.input(dt)
                    if clkState != clkLastState:
                        counter += 1
                        menu(counter%5)
                    clkLastState = clkState
                    time.sleep(0.1)
        else:
            welcome("Acess Denied")
finally:
    GPIO.cleanup()