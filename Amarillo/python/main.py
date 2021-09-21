'''
pip install flask
set FLASK_APP=main.py
pip install flask-mysql
flask run
los imports deben estar a color y no grises, si no, no funcioana la api
'''
import os
import json
import pymysql
from app import app
from db_config import mysql
from flask import jsonify,make_response
from flask import flash, request

@app.route('/users')
def users():
	
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("select * from hashtag;")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)

@app.route("/IniciarCarga",methods=['POST'])
def Cargando():
	request_data = request.get_json()
	registro = request_data
	#print(registro)

	#resp = jsonify('Tweet Aniadido!---')
	#resp.status_code = 200
	#return resp
	try:
		
		'''
		registro = {
			"nombre": "Delacruz Bowers",
		  	"comentario": "Tweet:0",
		  	"fecha": "3/1/2021",
		  	"hashtags": [
				"laborum",
				"adipisicing",
				"laborum",
				"dolor"
		  	],
		  	"upvotes": 15,
		  	"downvotes": 86
		}
		'''

		

		sql = "insert into noti_tweet (humano, comentario, fecha, up, down)values(%s, %s, STR_TO_DATE(REPLACE(%s,'/','.') ,GET_FORMAT(date,'EUR')), %s, %s);"
		data = (registro['nombre'], registro['comentario'], registro['fecha'], registro['upvotes'], registro['downvotes'])
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute(sql, data)
		conn.commit()
		cursor.execute("select id from noti_tweet order by id desc limit 1;")
		rows = cursor.fetchall()
		nuevoReg = rows[0]['id']
		sql2 = "insert into hashtag (nombre) values(%s);"
		sql3 = "insert into asignacion (id_noti_tweet, hashtag) values(%s, %s)"
		for hash in registro['hashtags']:
			try:
				data2 = (hash)
				cursor.execute(sql2, data2)
				conn.commit()
			except Exception as o:
				print(o, ' YA EXISTE ESTE HASHTAG')

			try:
				data3 = (nuevoReg, hash)
				cursor.execute(sql3, data3)
				conn.commit()
			except Exception as q:
				print(q, ' YA ESTA ESTA ASIGNACION')

		response = make_response(jsonify({"status": "ok","msg":"SUCCESSFUL DB QUERY","code":200}),200,)
		response.headers["Content-Type"] = "application/json"
		return response


		#resp.status_code = 200
		#return resp
	except Exception as e:
		print(e, 'ERROR en la carga de base de datos')
		response = make_response(jsonify({"status": "error","msg":str(e),"code":500}),500,)
		response.headers["Content-Type"] = "application/json"
		return response
		#return 'ERROR!'
	finally:
		cursor.close()
		conn.close()

@app.route("/")
def hello_world():
	name = os.environ.get("NAME", "World")
	return "Hello {}!".format(name)

if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0", port=3000)
