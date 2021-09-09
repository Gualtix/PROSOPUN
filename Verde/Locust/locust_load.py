from locust import HttpUser
from locust import SequentialTaskSet,task,between
import json


class MyTasks(SequentialTaskSet):
    def on_start(self):
        self.client.get("/")
      
    @task 
    def push_tweet(self):
        f = open('../data.json',)
        data = json.load(f)
        cnt = 0
        for i in data:
            response = self.client.post("/push_tweet", json = i)
            json_obj = response.json()
            if(json_obj['status']=='error'):
                cnt += 1
                
        ndt = len(data)
        print(f'Test de Carga Finalizado: Tweets Enviados: {ndt}')
        print(f'Peticiones que Produjeron Error: {cnt}')   
            #print(json_obj)
            #print()
            #sf = json.dumps(i, separators=(',', ':'))
        f.close()        
    
class MyWebsiteUser(HttpUser): 
    tasks= [MyTasks]
    #wait_time = between(5, 9)
    min_wait=100 #miliseconds
    max_wait=5000 #miliseconds
    # same as wait_time = between(0.100, 5)