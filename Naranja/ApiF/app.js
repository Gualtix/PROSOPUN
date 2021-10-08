const express = require ('express');
const http = require('http');
const mysql = require('mysql');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const socketIO = require('socket.io');
//const { countReset } = require('console');
//const io = socketIO.listen(Server);
const {database} = require('./config/helper');


///COSMOS CONFIGURATION

const { CosmosClient } = require("@azure/cosmos");
const e = require('express');
const { reverse } = require('dns');

const endpoint = "https://sistemasoperativos.documents.azure.com:443/";
const key = "<KpXECwtMz5yBzdWR7ufAea73rIoAzuwj0WF3M02P1GusmXXBVhnQfNfLhNmUXnRA0c4WDEDRN9qkDwoXNMjkUA==>";
const dbId = 'proyecto' || process.env.COSMOS_DB;
const containerId = 'Items' || process.env.COSMOS_CONTAINER;
const client = new CosmosClient({ endpoint, key });


const mensaje = []


id = ""
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const io = socketIO(server,{
    cors: {
        origin: "*"
    }
})


///VAMOS A PROBAR CONEXION A COSMOS
io.sockets.on('connection', (socket) => {
    var q = "SELECT * from noti_tweet"
    client.database(dbId).container(containerId).items.query(q)
    .fetchAll()
        .then(contenido => {
            data = contenido.resources;

            io.sockets.emit('azuC', {data});
            //console.log(data);
        })
        
        .catch(err => console.log(  err));
},500);//tiempo del servidor
//REPORTES COSMOS
io.sockets.on('connection', (socket) => {
  //Cuenta de noticias
  
  var q = "SELECT COUNT(nt.id) as CountNew,SUM(nt.upvotes) as CountUp  FROM noti_tweet nt"
  client.database(dbId).container(containerId).items.query(q)
  .fetchAll()
      .then(contenido => {
          data = contenido.resources;

          io.sockets.emit('azuC1', {data});
          //console.log(data);
      })  
      .catch(err => console.log(  err));
      
//Suma de upvotes
    var q = "SELECT * FROM hashtag.hashtags "
      var array = []
  client.database(dbId).container(containerId).items.query(q)
  .fetchAll()
      .then(contenido => {
          data = contenido.resources;
          data.map((e, index)=>(
            e.map((el)=>(
              array.push(el)
            ))
          ))
          const myUniqueA = [...new Set(array)]
          //console.log(myUniqueA)
          const n = myUniqueA.length
          io.sockets.emit('azuC2', {data:[{CountHash:n}]});
          
      })  
      .catch(err => console.log(  err));
      
      
      const mySet = new Set();

      //Top  5
      var q = "SELECT h.upvotes, h.hashtags FROM hashtag h  "
      var array2 = []
      var arrayp = []
      var val =0;
      var arrayaux =[]
  client.database(dbId).container(containerId).items.query(q)
  .fetchAll()
      .then(contenido => {
          data = contenido.resources;
          data.map((e)=>(
            e.hashtags.map((el)=>(
              mySet.add(el),
              array2.push({upv:e.upvotes, hash:el})
            ))
          ))
          arrayaux = [...mySet]
         
          arrayaux.map((e)=>(
            val = 0,
            array2.filter(ids => ids.hash === e).map((el)=>(
              val = val + el.upv
            )),
            arrayp.push({upv:val,hash:e})
          ))
          arrayp.sort(function (a, b){
            return (b.upv - a.upv)
        })
          //console.log(arrayp)
          io.sockets.emit('azuC3', {data:arrayp.splice(0,5)});
          
      })  
      .catch(err => console.log(  err));

      //barras 
      data = ""
       var q = "SELECT  nt.fecha, SUM(nt.downvotes) as downV, SUM(nt.upvotes) as ups  FROM noti_tweet nt"
       +" GROUP BY (nt.fecha)"
  client.database(dbId).container(containerId).items.query(q)
  .fetchAll()
      .then(contenido => {
          data = contenido.resources;

          io.sockets.emit('azuC4', {data});
          
         // console.log("salida");
          //console.log(data);

      })  
      .catch(err => console.log(  err));
});


/*
//mensaje de recepcion del Sub
io.sockets.on('connection',(socket)=>{
    console.log('nueva conexcion: ');
    
    
    socket.on('clientEnvioMsg', data =>{
        console.log('sale aca')
        const mens = data;
        //mensaje = {...data};
        //console.log("stoy aqui");
        console.log(mens)
        mensaje.splice(0, mensaje.length);
        
        mensaje.push(mens);
        console.log(mensaje)
    })

    console.log('entro pero no entro');
   
})*/



// Para instalar, utilizamos npm install --save @google-cloud/pubsub

const { PubSub } = require('@google-cloud/pubsub');
const keyFilename = 'key.json'
const SUB_NAME = 'projects/charged-sled-325502/subscriptions/so1-sub';

// Crear un nuevo cliente de pubsub
const client2 = new PubSub({keyFilename});

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
        mensaje.splice(0, mensaje.length);

        const mens =  {
            Api: jsonMessage.api,// || jsonMessage.Api || "Anonimo", 
            Guardados: jsonMessage.guardados,//  || jsonMessage.Guardados || "Empty" ,
            TiempoDeCarga: jsonMessage.TiempoDeCarga,// || jsonMessage.TiempoDeCarga || "Empty" ,
            DB: jsonMessage.bd,// || jsonMessage.DB || "Empty" 
        }
        mensaje.push(mens)
        console.log(mensaje)
        console.log("envio el mensaje")
        
        ///await axios.post(process.env.API_URL, request_body);
    }
    catch (e) {
        console.log(`Error al realizar POST ${e.message}`);
    }
};




//Mensaje del Sub al React
io.sockets.on('connection',(socket)=>{
  //  console.log('dentro');
  const sub = client2.subscription(SUB_NAME);
  // Conectar el evento "message" al lector de mensajes
  sub.on('message', messageReader);
  console.log(mensaje)
        
    socket.emit('ReEnvio',{ReEnvio:mensaje});
})




//CONSULTAS MYSQL DE CLOUDSQL
  io.sockets.on('connection', function (socket) {
//CUENTA DE TOTAL DE NOTICIAS\
    var q = "SELECT COUNT(id) as CountNew FROM noti_tweet";
  database.query(q)
  .then(row => {
      data1 = row;
    /*  console.log("este es la respuesta")
      console.log(data1)
      console.log(row)*/
      io.sockets.emit('consulta0', {consulta: data1});
      //console.log("entro aca");
  })
  .catch(err => console.log(  err));
  
  //CUENTA DE HASTAGS
    var q = "SELECT COUNT(nombre) as CountHash FROM hashtag";
    database.query(q)
    .then(row => {
        data1 = row;
        /*console.log("este es la respuesta")
        console.log(data1)
        console.log(row)*/
        io.sockets.emit('consulta1', {consulta: data1});
        //console.log("entro aca");
    })
    .catch(err => console.log(  err));

    //CUENTA DE UP VOTES
   var q = "SELECT SUM(up) as CountUp FROM noti_tweet";
    database.query(q)
    .then(row => {
        data1 = row;
        /*console.log("este es la respuesta")
        console.log(data1)
        console.log(row)*/
        io.sockets.emit('consulta2', {consulta: data1});
        //console.log("entro aca");
    })
    .catch(err => console.log(  err));

    //TOP 5 DE HASHTAGS
    var q = "SELECT a.hashtag, SUM(nt.up) as total FROM hashtag h,noti_tweet nt,asignacion a "+
            "WHERE h.nombre = a.hashtag AND nt.id =a.id_noti_tweet "+
            "GROUP BY (a.hashtag) ORDER BY total DESC LIMIT 5";
            
    database.query(q)
    .then(row => {
        data1 = row;
        /*console.log("este es la respuesta")
        console.log(data1)
        console.log(row)*/
        io.sockets.emit('top5', {top: [...data1]});
        //console.log("entro aca");
    })
    .catch(err => console.log(  err));

    var q = "SELECT DISTINCT  fecha, SUM(up) as ups, SUM(down) as downV FROM noti_tweet "
       +" GROUP BY (fecha)";
    database.query(q)
    .then(row => {
        data1 = row;
        /*console.log("este es la respuesta barras")
        console.log(data1)
        //console.log(row)*/
        io.sockets.emit('barras', {barras: [...data1]});
    })
    .catch(err => console.log(  err));
  });
  

io.sockets.on('connection', (socket) => {
    id = socket;
    database.table('noti_tweet') //nombre de la tabla
        .withFields(['id','humano', 'comentario', 'fecha', 'up','down'])//campos de la tabla, etc
        .sort({id: -1})//ordenado por id en orden descendente +1 seria ascendente
        .getAll()//se obtienen todos los datos
        //.limit(size=2){size:2} limite o top
        
        .then(contenido => {
            data = contenido;
            io.sockets.emit('contenido', {contenido: [...data]});
            //console.log("entro aca");
        })
        
        .catch(err => console.log(  err));

        database.table('asignacion') //nombre de la tabla
        .withFields(['hashtag','id_noti_tweet'])//campos de la tabla, etc
        //.sort({id: -1})//ordenado por id en orden descendente +1 seria ascendente
        .getAll()//se obtienen todos los datos
        //.limit(size=2){size:2} limite o top
        
        .then(contenido => {
            data = contenido;
            io.sockets.emit('hashs', {hashs: [...data]});
            //console.log("entro aca");
        })
        
        .catch(err => console.log(  err));

        //socket.emit('ReEnvio',{ReEnvio:mensaje});
},500);//tiempo del servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log('Server running on port 8080');
})
//pure-ethos-325501
