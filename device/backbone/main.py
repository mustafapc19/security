def screensaver():




def getAccessByHash():




def pushAttendance():






def menu(res):
    term_print("Welcome {res.name}")
    opts = opts.append("key")
    index = 0
    now = time.Now()
    then = time.Now()
    while(now-then<4):
        for(i=0;i<opts.len;i++):
            if(i==index):
                term_print(opts[i]).color()
                continue
            term_print(opts[i])
            
            (flag,inp) = input()
            if(flag==1)
        



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
            wait(1)                           #instead of wait use the time diff
            flag=0
            continue

    elif(flag==2):
        rfidToServer(inp)
        flag=0
    elif(flag==3 or flag==4 or flag==):
        term_print('FingerPrint?')
        wait(0.5)

    else:
        screensaver()