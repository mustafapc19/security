def screensaver():




def getAccessByHash():




def pushAttendance():



def rfidToServer():

while(True):
    (flag,inp) = input()  
    
    if(flag==0):
        screensaver()
    
    
    elif(flag==1):
        (flag,res) = pushAttendance(inp) #flag = verified or not(fingerprint)
        
        if(flag):
            menu(res) #res = name 

        else:
            term_print('FingerPrint Incorrect')
            wait(1)
            flag=0
            continue

    elif(flag==2):
        term_print('FingerPrint?')
        wait(0.5)

    elif(flag==3):
        rfidToServer(inp)
        flag=0

    else:
        screensaver()