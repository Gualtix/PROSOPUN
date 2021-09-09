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
        
        for i in data['tweets']:
            self.client.post("/push_tweet", json = i)

            #print()
            #sf = json.dumps(i, separators=(',', ':'))
        f.close()
        
        
    
    '''
    @seq_task(2) # After login(), get_dashboard will be called
    @task(4) # 4 times get_dashboard() will be called
    def get_dashboard(self):
        self.client.get("/account/dashboard")
    
    @seq_task(3) # After get_dashboard(), logout() will be called 1 time( by Default)
    def logout(self):
        self.client.post("/account/logout")
    '''
        
        
    
class MyWebsiteUser(HttpUser): 
    tasks= [MyTasks]
    wait_time = between(5, 9)
    #min_wait=100 #miliseconds
    #max_wait=5000 #miliseconds
    # same as wait_time = between(0.100, 5)