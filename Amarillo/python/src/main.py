'''
pip install flask
set FLASK_APP=main.py
pip install flask-mysql
flask run
los imports deben estar a color y no grises, si no, no funcioana la api
'''
import azure.cosmos.documents as documents
import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.exceptions as exceptions
from azure.cosmos.partition_key import PartitionKey
import datetime
import config

import os
import json
import pymysql, time
from app import app
from db_config import mysql
from flask import jsonify,make_response
from flask import flash, request
from google.cloud import pubsub_v1
from google.auth import jwt

#2 variables globales, el json con los datos y el objeto para la notifiacion

HOST = config.settings['host']
MASTER_KEY = config.settings['master_key']
DATABASE_ID = config.settings['database_id']
CONTAINER_ID = config.settings['container_id']
datos = [];
notif = {
			"guardados": 0,
			"api": "python",
			"tiempoDeCarga": 0,
			"bd": "CloudSQL"
		}
counter = 0;
tiempo = 0;

def azureDB(newReg, Datos):
	client = cosmos_client.CosmosClient(HOST, {'masterKey': MASTER_KEY}, user_agent="CosmosDBPythonQuickstart",
										user_agent_overwrite=True)
	try:
		# setup database for this sample
		try:
			db = client.create_database(id=DATABASE_ID)
			print('Database with id \'{0}\' created'.format(DATABASE_ID))

		except exceptions.CosmosResourceExistsError:
			db = client.get_database_client(DATABASE_ID)
			print('Database with id \'{0}\' was found'.format(DATABASE_ID))

		# setup container for this sample
		try:
			container = db.create_container(id=CONTAINER_ID, partition_key=PartitionKey(path='/partitionKey'))
			print('Container with id \'{0}\' created'.format(CONTAINER_ID))

		except exceptions.CosmosResourceExistsError:
			container = db.get_container_client(CONTAINER_ID)
			print('Container with id \'{0}\' was found'.format(CONTAINER_ID))

		#cale_container(container)
		order1 = {'id': str(newReg),
		  	"nombre": Datos['nombre'],
		  	"comentario": Datos['comentario'],
		  	"fecha": Datos['fecha'],
		  	"hashtags": Datos['hashtags'],
		  	"upvotes": Datos['upvotes'],
		  	"downvotes": Datos['downvotes']
        }
		container.create_item(body=order1)
		'''try:
            #client.delete_database(db)

        except exceptions.CosmosResourceNotFoundError:
            pass'''

	except exceptions.CosmosHttpResponseError as e:
		print('\nrun_sample has caught an error. {0}'.format(e.message))

	finally:
		print("\nrun_sample done")

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
	for dato in dats:

		try:
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
			azureDB(nuevoReg, registro)
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
		except Exception as t:
			print(t, 'INVALID INSERTION')
		

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
	cursor.close()
	conn.close()
	return response


@app.route("/FinalizarCarga", methods=['POST'])
def Fin():
	dat1 = request.get_json()
	global counter
	global notif
	
	counter = 0

	project_id = "charged-sled-325502"
	topic_id = "so1" 
	
	'''
	publisher = pubsub_v1.PublisherClient()
	topic_path = publisher.topic_path(project_id, topic_id)

	topic = publisher.create_topic(request={"name": topic_path})

	print(f"Created topic: {topic.name}")
	'''

	#publisher = pubsub_v1.PublisherClient()
	

	service_account_info = json.load(open("./key.json"))
	audience = "https://pubsub.googleapis.com/google.pubsub.v1.Subscriber"

	credentials = jwt.Credentials.from_service_account_info(
		service_account_info, audience=audience
	)

	publisher_audience = "https://pubsub.googleapis.com/google.pubsub.v1.Publisher"
	credentials_pub = credentials.with_claims(audience=publisher_audience)
	publisher = pubsub_v1.PublisherClient(credentials=credentials_pub)

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
	name = os.environ.get("NAME", "Kitty")
	return "Hello {}!".format(name)

if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0", port=3000)
