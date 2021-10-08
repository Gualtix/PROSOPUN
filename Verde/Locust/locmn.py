from locust import HttpUser
from locust import SequentialTaskSet,task,between
import json
import os
import requests
import json


class MyTasks(SequentialTaskSet):
    def on_start(self):
        self.client.get("/")

    @task 
    def IniciarCarga(self):

        clear = lambda: os.system('cls')
        clear()
        print('* * * I N I C I A R   C A R G A * * *')

        f = open('../data.json',)
        data = json.load(f)
        cnt = 0

        for i in data:
            cnt += 1
            print('Enviando Objeto: ' + str(cnt) + '...')

            try:
                response = self.client.post("/IniciarCarga", json = i)
            except Exception as o:
                print(self.host+'/IniciarCarga: No Responde')
                print('')
                continue
            
            print('')
            
            json_obj = response.json()
            
        ndt = len(data)
        f.close()

        print(f'IniciarCarga Finalizado con Exito!')
        print(f'Se Enviaron: {ndt} Objetos')
        input("Press Enter to continue...")

    
    @task
    def Publicar(self):
        
        clear = lambda: os.system('cls')
        clear()
        print('* * * P U B L I C A R * * *')

        try:
            response = self.client.post("/Publicar", json = {})
            print(response.json())
        except Exception as o:
            print(self.host+'/Publicar: No Responde')
        
        print('')    
        input("Press Enter to continue...")

    @task
    def FinalizarCarga(self):
        
        clear = lambda: os.system('cls')
        clear()
        print('* * * F I N A L I Z A R   C A R G A * * *')

        try:
            response = self.client.post("/FinalizarCarga", json = {})
            print(response.json())
        except Exception as o:
            print(self.host+'/FinalizarCarga: No Responde')
        
        print('')    
        input("Press Enter to continue...")
        raise exit()
    
        

    
class MyWebsiteUser(HttpUser): 
    host="http://34.132.20.59:3000"
    #host="http://localhost:3000"
    tasks= [MyTasks]
    
    
    #wait_time = between(5, 9)
    min_wait=100 #miliseconds
    max_wait=5000 #miliseconds
    
    # same as wait_time = between(0.100, 5)

#locust -f locmn.py --no-web -c 1 -r 1