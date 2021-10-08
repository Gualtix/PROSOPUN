import requests
import json
import time

url = 'http://35.184.109.181:8000/RAM'

class sender:

    def run():

        #{"total":1020657600, "libre": 316932096, "mem_unit": 4096}
        #{"total":1020657650, "libre": 316932096, "mem_unit": 4096}
        #{"total":1020657700, "libre": 316932096, "mem_unit": 4096}

        while True:
            f = open('/proc/ram.json',)
            data = json.load(f)
            data['so'] = 'UBUNTU'
            response = requests.post(f'{url}/RAM', json = data)
            json_obj = response.json()
            print(json_obj)
            f.close() 
            time.sleep(5)

if __name__ == "__main__" :
    sender.run()





