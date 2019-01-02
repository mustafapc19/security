import requests
import json

def getAccessByHash(inp,address,port):
    address = "http://"+address+":"+port+"/device/getAccessByHash"
    flag=False
    r = requests.post(address,data={"hash":inp})
    if(r.status_code==200):
        flag=True
    else:
        flag=False
    
    r = json.loads(r.text)
    return (flag,r)