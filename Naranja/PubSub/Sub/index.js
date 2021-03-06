

// Para instalar, utilizamos npm install --save @google-cloud/pubsub

const { PubSub } = require('@google-cloud/pubsub');
//const {Storage} = require('@google-cloud/storage');

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// const projectId = 'project-id'
const keyFilename = 'key.json'
//const storage = new Storage({projectId, keyFilename});

// Acá escribimos la suscripción que creamos en Google Pub/Sub
const SUB_NAME = 'projects/charged-sled-325502/subscriptions/so1-sub';//'projects/sopes1-auxiliatura/subscriptions/twitterLite-sub';

// Cantidad de segundos que estara prendido nuestro listener
// Solo para efectos practicos, realmente esto debería estar escuchando en todo momento!
const TIMEOUT = process.env.TIMEOUT || 1000;//180

// Crear un nuevo cliente de pubsub
const client = new PubSub({keyFilename});

// En este array guardaremos nuestros datos
const messages = [];

// Esta funcion se utilizara para leer un mensaje
// Se activara cuando se dispare el evento "message" del subscriber
const messageReader = async message => {

    console.log('¡Mensaje recibido!');
    console.log(`${message.id} - ${message.data}`);
    console.table(message.attributes);

    messages.push({ msg: String(message.data), id: message.id, ...message.attributes });

    // Con esto marcamos el acknowledgement de que recibimos el mensaje
    // Si no marcamos esto, los mensajes se nos seguirán enviando aunque ya los hayamos leído!
    message.ack();
    
    

    try {
        console.log(`Agregando mensaje al servidor...`);
        const jsonMessage = JSON.parse(message.data) || {};
        //const request_body = { name: jsonMessage.Name || jsonMessage.name || "Anonimo", msg: jsonMessage.Msg || jsonMessage.msg || "Empty" };
        console.log(jsonMessage)
        const io = require("socket.io-client");

        //const socket = io('https://pure-ethos-325501.uc.r.appspot.com');
        const socket = io('http://localhost:8080');
        socket.emit('clientEnvioMsg',{
            Api: jsonMessage.api, //|| jsonMessage.Api || "Anonimo", 
            Guardados: jsonMessage.guardados,//  || jsonMessage.Guardados || "Empty" ,
            TiempoDeCarga: jsonMessage.TiempoDeCarga,//  || jsonMessage.TiempoDeCarga || "Empty" ,
            DB: jsonMessage.bd,// || jsonMessage.DB || "Empty" 
        })
        console.log("envio el mensaje")
        socket.disconnect()
        ///await axios.post(process.env.API_URL, request_body);
    }
    catch (e) {
        console.log(`Error al realizar POST ${e.message}`);
    }
};

// Empezamos nuestro manejador de notificaciones
const notificationListener = () => {

    // Creamos un subscriptor
    // Pasamos el nombre de nuestro subscriptor (que encontramos en Google Cloud)
    const sub = client.subscription(SUB_NAME);

    // Conectar el evento "message" al lector de mensajes
    sub.on('message', messageReader);

    console.log("Estoy a la espera de los mensajes...");

 /*   setTimeout(() => {
        sub.removeListener('message', messageReader);

        if (messages.length > 0) {
            console.log(`${messages.length} mensajes recibidos: `);
            console.log("---------");
            console.table(messages);
        }
        else {
            console.log("No hubo ningún mensaje en este tiempo. :(")
        }

    }, TIMEOUT * 1000);
    */
};

console.log(`Iniciando Subscriber, deteniendolo en ${TIMEOUT} segundos...`);

// Empezar a escuchar los mensajes
notificationListener();
