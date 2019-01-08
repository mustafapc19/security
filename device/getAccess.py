import requests
import json

def getAccessByHash(inp,address,port):
    address = "http://"+address+":"+port+"/device/getAccessByHash"
    flag=False
    r = requests.post(address,data={"hash":inp})
    if(r.status_code==200):
        flag=True
        r = json.loads(r.text)
    else:
        flag=False
        r = False

    return (flag,r)

def nodeConnectCheck(status,address,port):
    address = "http://"+address+":"+port+"/device/init"
    r = requests.post(address,data={"status":status})

    if(r.status_code==200):
        return True
    else:
        return False
    