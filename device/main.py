from display import screensaver,welcome,menu,init_display,draw_text
from rfid import read_rfid
import finger
import time
import RPi.GPIO as GPIO
import subprocess
import sys
import socket
import fcntl
import struct
from getAccess import getAccessByHash,nodeConnectCheck

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
port = '1234'
ip_address = '127.0.0.1'

def logger(error):
    #3 yet to complete
    print error

def init_server(status):
    global port
    global ip_address
    if(status == True):
        status = "ready"
    else:
        status = "failed"

    ## checking if already the process is running
    ps = subprocess.Popen("ps -ef | grep node | grep -v grep ", stdout=subprocess.PIPE, stderr=subprocess.PIPE,shell = True)
    (output,error) = ps.communicate()

    if(output.find('node') == -1):
        ## starting node process
        subprocess.Popen('node ../back_end/app.js',shell=True)
        time.sleep(10)

    ## checking if the server is responding
    ret = False
    loop_val = 5
    while (loop_val>0):
        ret = nodeConnectCheck(status,ip_address,port)
        if(ret == True):
            break
        loop_val = loop_val - 1
        time.sleep(1)

    ## return 
    return ret

def init():
    return_val = True 
    ## Components check
    ## first component init >> Display
    display_init_return = init_display()

    if(display_init_return == True):
        draw_text("Getting Ready",0,0)## 0 0 are width offset and height offset
        time.sleep(2)

        ## fingerPrint component init
        finger_init_return = finger.init()
        if(finger_init_return == True):
            draw_text("Components Ready",10,0)
            time.sleep(2)
        else:
            logger(finger_init_return)
            draw_text("FingerPrint Failed",12,0)
            time.sleep(2)
            return_val = False

    else:
        logger(display_init_return)
        return_val = False

    ## Server check
    server_init_return = init_server(return_val)

    if(server_init_return == True):
        draw_text("Server Ready",0,0)
        time.sleep(2)
    else:
        draw_text("Server Failed",0,0)
        time.sleep(2)
        logger("server failed")        
        return_val = False

    ## Connection status
    ifname = 'wlan0'
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    ip_device_address = socket.inet_ntoa(fcntl.ioctl(s.fileno(),0x8915,struct.pack('256s', ifname[:15]))[20:24])
    if(ip_device_address != None):
        draw_text("Wifi Connected",8,0)
        time.sleep(2)
        draw_text("Ip Address",-7,0,True,str(ip_device_address),6,-7)
        time.sleep(5)
    else:
        draw_text("Wifi Not Connected",14,0)
        time.sleep(2)
        draw_text("Create hotspot to connect",18,0)
        time.sleep(5)

    return return_val

def sw_callback(channel):
    global clickToggle
    clickToggle = True

GPIO.add_event_detect(sw, GPIO.FALLING , callback=sw_callback, bouncetime=300)  

try:
    init_return = init()

    if(init_return):
        while True:
            screensaver()
            ret,hashval = finger.search()
            if ret:
                (flag,res) = getAccessByHash(hashval,ip_address,port)
                if(flag):
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
                    draw_text("Server Error",0,0)
                    time.sleep(2)
            else:
                welcome("Acess Denied")

finally:
    GPIO.cleanup()