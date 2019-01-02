from display import screensaver,welcome,menu
from rfid import read_rfid
import finger
import time
import RPi.GPIO as GPIO
from getAccess import getAccessByHash

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
global length_menu

def sw_callback(channel):
    global clickToggle
    global counter
    if(counter%(length_menu-1) == 0):
        clickToggle = True

GPIO.add_event_detect(sw, GPIO.FALLING , callback=sw_callback, bouncetime=300)  

try:
    while True:
        ret,hashval = finger.search()
        ret = True
        hashval = "4d0418a8b44730763d3dcc08d6020be881634d1f5307efb65e97ae641121a06b"
        if ret:
            (flag,res) = getAccessByHash(hashval,"192.168.1.31","1234")
            print(res)
            length_menu = len(res["access"])
            welcome("welcome "+res["username"])
            
            menu(0,res["access"])
            while True:
                if(clickToggle):
                    clickToggle = False
                    break
                else:
                    clkState = GPIO.input(clk)
                    dtState = GPIO.input(dt)
                    if clkState != clkLastState:
                        counter += 1
                        menu(counter%(length_menu),res["access"])
                    clkLastState = clkState
                    time.sleep(0.1)
        else:
            welcome("Acess Denied")
finally:
    GPIO.cleanup()