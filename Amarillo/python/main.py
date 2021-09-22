'''
pip install flask
set FLASK_APP=main.py
pip install flask-mysql
flask run
los imports deben estar a color y no grises, si no, no funcioana la api
'''
import os
import json
import pymysql, time
from app import app
from db_config import mysql
from flask import jsonify,make_response
from flask import flash, request
from google.cloud import pubsub_v1

#2 variables globales, el json con los datos y el objeto para la notifiacion

datos = [];
notif = {
			"guardados": 0,
			"api": "python",
			"tiempoDeCarga": 0,
			"bd": "CloudSQL"
		}
counter = 0;
tiempo = 0;

@app.route('/IniciarCarga', methods=['POST'])
def Cargando():
	dat = request.get_json()
	datos.append(dat)
	return jsonify('datos cargados')

@app.route("/Publicar", methods=['POST'])
def Publica():
	global datos
	dats = datos
	tic = time.perf_counter()
	#print(registro)

	#return resp
	try:
		for dato in dats:
			registro = dato
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

			global counter
			counter += 1

		response = make_response(jsonify({"status": "ok","msg":"SUCCESSFUL DB QUERY","code":200}),200,)
		response.headers["Content-Type"] = "application/json"
		toc = time.perf_counter()
		global tiempo
		tiempo = toc - tic
		#print(f"Tiempo {toc - tic:0.4f}")
		global notif
		notif = {
			"guardados": counter,
			"api": "python",
			"tiempoDeCarga": f"{tiempo:0.2f}",
			"bd": "CloudSQL"
		}
		datos = []
		print(notif)
		return response

	except Exception as e:
		print(e, 'ERROR en la carga de base de datos')
		response = make_response(jsonify({"status": "error","msg":str(e),"code":500}),500,)
		response.headers["Content-Type"] = "application/json"
		return response
		#return 'ERROR!'
	finally:
		cursor.close()
		conn.close()

@app.route("/FinalizarCarga", methods=['GET'])
def Fin():
	'''
	global counter
	global notif
	'''
	notif = {
		"guardados": 0,
		"api": "python",
		"tiempoDeCarga": 0,
		"bd": "CloudSQL"
	}
	
	counter = 0

	project_id = "charged-sled-325502"
	topic_id = "so1" 
	
	'''
	publisher = pubsub_v1.PublisherClient()
	topic_path = publisher.topic_path(project_id, topic_id)

	topic = publisher.create_topic(request={"name": topic_path})

	

	print(f"Created topic: {topic.name}")
	'''



	publisher = pubsub_v1.PublisherClient()
	topic_name = 'projects/{project_id}/topics/{topic}'.format(
		project_id='charged-sled-325502',
		topic='so1',  
	)

	msg = json.dumps(notif)
	data = msg.encode("utf-8")
	future = publisher.publish(topic_name, data, spam='eggs')
	future.result()

	return jsonify(notif)

@app.route("/")
def hello_world():
	name = os.environ.get("NAME", "World")
	return "Hello {}!".format(name)

if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0", port=3000)
