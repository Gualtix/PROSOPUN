'''
pip install flask
set FLASK_APP=main.py
pip install flask-mysql
flask run
los imports deben estar a color y no grises, si no, no funcioana la api
'''
import datetime
from flask import json
from flask.json import dump

import config

import os
from app import app
from flask import jsonify, make_response
from flask import flash, request

#2 variables globales, el json con los datos y el objeto para la notifiacion

datos = [];
datos1 = [];


@app.route('/RAM', methods=['POST'])
def Ram():
	dat = request.get_json()
	memorialibre = int(json.dumps(dat['libre']))/1024
	memoriatotal = int(json.dumps(dat['total']))/1024

	texto = 'Memoria libre: ' + str(memorialibre) + ' Kbytes ', 'Memoria total: ' + str(memoriatotal) + ' Kbytes', 'SO: ' + dat['so']

	print(texto,'-----------')
	return jsonify({'ok RAM':dat})

@app.route('/CPU', methods=['POST'])
def Cpu():
	dat = request.get_json()
	datos1.append(dat)
	return jsonify({'ok CPU':datos1})
	

@app.route("/")
def hello_world():
	name = os.environ.get("NAME", "Walter")
	return "Hello {}!".format(name)

if __name__ == "__main__":
	print('-----JALO------');
	app.run(debug=True, host="0.0.0.0", port=3000)
