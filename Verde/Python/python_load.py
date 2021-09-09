import requests
import json

url = 'http://localhost:3000'

class loadtest:

    def run():
       
        f = open('../data.json',)
        data = json.load(f)
        cnt = 0
        for i in data:
            response = requests.post(f'{url}/push_tweet', json = i)
            json_obj = response.json()
            if(json_obj['status']=='error'):
                cnt += 1
        ndt = len(data)
        print(f'Test de Carga Finalizado: Tweets Enviados: {ndt}')
        print(f'Peticiones que Produjeron Error: {cnt}')   
        f.close() 

if __name__ == "__main__" :
    loadtest.run()






'''
#import backend
from flask import Flask, request
import datetime as dt

from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/*":{"origin": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

url = 'http://localhost:3000'


@app.route("/push_tweet", methods=["POST"])
def api():
        f = open('../data.json',)
        data = json.load(f)
        cnt = 0
        for i in data['tweets']:
            response = requests.post(f'{url}/push_tweet', json = i)
            json_obj = response.json()
            if(json_obj['status']=='error'):
                cnt += 1
        
        ndt = len(data['tweets'])
        print(f'Test de Carga Finalizado: Tweets Enviados: {ndt}')
        print(f'Peticiones que Produjeron Error: {cnt}')   
            #print(json_obj)
            #print()
            #sf = json.dumps(i, separators=(',', ':'))

        f.close() 
    

if __name__ == "__main__":
    app.run()
# 
# 2021-01-04T06:00:00.000+00:00
'''