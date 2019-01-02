import requests
import json

def getAccesByHash(inp,address,port)
    address = address+":"+port+"/device/getAccessByHash"
    flag=False
    r = requests.post(address,data={"hash":inp})
    if(r.status_code==200):
        flag=True
    else:
        flag=False
    
    r = json.loads(r.text)
    return (flag,r)