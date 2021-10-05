import requests
import json

#url = 'http://localhost:3000'
#url = 'http://35.209.199.1:80'
#url = 'http://34.120.10.14:80'


url = 'http://34.123.109.15:3000'

class loadtest:

    def InicarCarga():
       
        f = open('../data.json',)
        data = json.load(f)
        cnt = 0
        for i in data:
            response = requests.post(f'{url}/IniciarCarga', json = i)
            json_obj = response.json()
            cnt += 1
            print('Enviando ' + str(cnt) + '...')
            '''
            if(json_obj['status']=='error'):
                cnt += 1
                '''
        ndt = len(data)
        print(f'Test de Carga Finalizado: Tweets Enviados: {ndt}')
        #print(f'Peticiones que Produjeron Error: {cnt}')   
        f.close() 
    
    def Publicar():
        blog = {'URL': 'datacamp.com', 'name': 'Datacamp'}
        to_json= json.dumps(blog)
        response = requests.post(f'{url}/Publicar', json = {})

        if (
            response.status_code != 204 and
            response.headers["content-type"].strip().startswith("application/json")
        ):
            try:
                return response.json()
            except ValueError:
                print('vacio')
        print('Saliendo de Publicar...')

        #json_obj = response.json()
        #print(json_obj)
    
    def FinalizarCarga():
        response = requests.post(f'{url}/FinalizarCarga',json = {})
        json_obj = response.json()
        print(json_obj)

if __name__ == "__main__" :
    loadtest.InicarCarga()
    loadtest.Publicar()
    loadtest.FinalizarCarga()






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