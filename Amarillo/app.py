from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from bson import json_util
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://mydatabase:27017/local'

mongo = PyMongo(app)


@app.route('/mensajes', methods=['POST'])
def create_mesaje():
    # Receiving Data
    username = request.json['autor']
    email = request.json['nota']

    if username and email:
        id = mongo.db.local.insert(
            {'autor': username, 'nota': email}
            )
        response = jsonify({
            '_id': str(id),
            'autor': username,
            'nota': email
        })
        response.status_code = 201
        return response
    else:
        return not_found()


@app.route('/mensajes', methods=['GET'])
def get_mensajes():
    users = mongo.db.local.find()
    response = json_util.dumps(users)
    return Response(response, mimetype="application/json")


@app.route('/cantidad', methods=['GET'])
def get_mensajescantidad():
    users = mongo.db.local.count()
    message = {
        'number': users
    }
    response = json_util.dumps(message)
    return Response(response, mimetype="application/json")


@app.route('/mensajes/<id>', methods=['GET'])
def get_mensajesid(id):
    print(id)
    user = mongo.db.local.find({'autor': id})
    response = json_util.dumps(user)
    return Response(response, mimetype="application/json")


@app.route('/mensajes/<id>', methods=['DELETE'])
def delete_user(id):
    print(id)
    mongo.db.local.delete_one({'autor': id})
    response = jsonify({'message': 'autor ' + id + ' Deleted Successfully'})
    response.status_code = 200
    return response


@app.route('/datos1', methods=['GET'])
def get_datos1():
    cadena = open("/app/src/hola.txt", "r")
    response = json_util.dumps(cadena.read())
    return Response(response, mimetype="application/json")


@app.route('/datos2', methods=['GET'])
def get_datos2():
    cadena2 = open("/app/src/hola2.txt", "r")
    response = json_util.dumps(cadena2.read())
    return Response(response, mimetype="application/json")


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'message': 'Resource Not Found ' + request.url,
        'status': 404
    }
    response = jsonify(message)
    response.status_code = 404
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)