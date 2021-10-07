'''
pip install flask
set FLASK_APP=main.py
pip install flask-mysql
flask run
los imports deben estar a color y no grises, si no, no funcioana la api
pip install prometheus-client
https://www.youtube.com/watch?v=HzEiRwJP6ag

https://pythonrepo.com/repo/prometheus-client_python-python-monitoring

'''
import datetime
from flask import json
from flask.json import dump

import os
import time

from flask.wrappers import Response
from app import app
from flask import jsonify, make_response
from flask import flash, request
import prometheus_client
from prometheus_client.core import CollectorRegistry
from prometheus_client import Summary, Counter, Histogram, Gauge

#2 variables globales, el json con los datos y el objeto para la notifiacion

graphs = {}
graphs['c'] = Gauge('mi_Porcentaje', 'Porcentaje')
graphs['h'] = Gauge('mi_Total', 'Total')


datos = [];
datos1 = [];


@app.route("/")
def hello():
    start = time.time()
    graphs['c'].set(start)
    
    time.sleep(0.600)
    end = time.time()
    graphs['h'].set(end - start)
    return "Hello World!"

@app.route("/metrics")
def requests_count():
    res = []
    for k,v in graphs.items():
        res.append(prometheus_client.generate_latest(v))
    return Response(res, mimetype="text/plain")

if __name__ == "__main__":
	print('-----JALO------');
	app.run(debug=True, host="0.0.0.0", port=8000)

'''_INF = float("inf")

graphs = {}
graphs['c'] = Counter('python_request_operations_total', 'The total number of processed requests')
graphs['h'] = Histogram('python_request_duration_seconds', 'Histogram for the duration in seconds.', buckets=(1, 2, 5, 6, 10, _INF))

@app.route("/")
def hello():
    start = time.time()
    graphs['c'].inc()
    
    time.sleep(0.600)
    end = time.time()
    graphs['h'].observe(end - start)
    return "Hello World!"

@app.route("/metrics")
def requests_count():
    res = []
    for k,v in graphs.items():
        res.append(prometheus_client.generate_latest(v))
    return Response(res, mimetype="text/plain")'''