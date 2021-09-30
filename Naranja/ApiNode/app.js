const express = require ('express');
const http = require('http');
const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events')
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

/*async function run() {
    const client = new CosmosClient({
      endpoint,
      key
    });
*/

const mensaje = []




//const bodyParse = require('body-parser');

//const PORT = process.env.PORT || 3050;


//coneccion al puerto de la app web

/*
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
*/
id = ""
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const io = socketIO(server,{
    cors: {
        origin: "*"
    }
})

/*async function main() {
    // The rest of the README samples are designed to be pasted into this function body
    const { resources } = await  client.database(dbId).container(containerId).items.query("SELECT * from noti_tweet")
  .fetchAll();
    for (const city of resources) {
    console.log(`${city.nombre}, ${city.fecha},${city.comentario},${city.comentario},${city.upvotes},${city.downvotes},  resultado `);
    }
  }
  
  main().catch((error) => {
    console.error(error);
  });*/
//main();
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



//mensaje de recepcion del Sub
io.sockets.on('connection',(socket)=>{
  //  console.log('nueva conexcion: ');
    
    
    socket.on('clientEnvioMsg', data =>{
        console.log('sale aca')
        const mens = data;
        //mensaje = {...data};
        //console.log("stoy aqui");
        console.log(mens)
        /*console.log(socket.id)
        console.log(id.id);*/
        mensaje.splice(0, mensaje.length);
        
        mensaje.push(mens);
        console.log(mensaje)
    })
   
})

//Mensaje del Sub al React
io.sockets.on('connection',(socket)=>{
  //  console.log('dentro');
    socket.emit('ReEnvio',{ReEnvio:mensaje});
})

var prev_id = 0;
/*
io.sockets.on('connection', function (socket) {
  //socket.emit('greeting', 'Hello');
  console.log("dentro de consulta")
 // var uid = data['uid'];
  var q = "SELECT * FROM noti_tweet WHERE id = 2 ORDER BY id DESC LIMIT 1";
  database.query(q, function(err, rows, fields) {
      if (err) throw err;
        console.log(err)
      console.log(rows);
        datos = rows;
            io.sockets.emit('contenido', {contenido: [...datos]});
        socket.emit('consulta1',datos);
        console.log('ahora van datos');
        console.log(datos);
        //prev_id = rows[0].id
      
    });
});*/

/*
io.sockets.on('connection', function (socket) {
  //socket.emit('greeting', 'Hello');
  console.log("dentro de consulta")
 // var uid = data['uid'];
  var q = "SELECT * FROM noti_tweet WHERE id = 2 ORDER BY id DESC LIMIT 1";

  database.query(q,function(err, rows, fields){
    if (err) throw err;
        console.log(err)

        
      console.log("rows")
      console.log(rows)
  })
  .then(row => {
      data1 = row;
      console.log("este es la respuesta")
      console.log(row)
      io.sockets.emit('consulta1', {consulta: [...data1]});
      //console.log("entro aca");
  })
  
  .catch(err => console.log(  err));

});*/
/*
//CANTIDAD DE NOTICIAS EN LA BASE DE DATOS
io.sockets.on('connection', function (socket) {
  var q = "SELECT COUNT(id) as CountNew FROM noti_tweet";
  database.query(q)
  .then(row => {
      data1 = row;
      console.log("este es la respuesta")
      console.log(data1)
      console.log(row)
      io.sockets.emit('consulta1', {consulta: data1});
      //console.log("entro aca");
  })
  .catch(err => console.log(  err));
});
*/
/*
//CUENTA LOS HASHTAG EN LA BASE DE DATOS
io.sockets.on('connection', function (socket) {
    var q = "SELECT COUNT(nombre) as CountHash FROM hashtag";
    database.query(q)
    .then(row => {
        data1 = row;
        console.log("este es la respuesta")
        console.log(data1)
        console.log(row)
        io.sockets.emit('consulta1', {consulta: data1});
        //console.log("entro aca");
    })
    .catch(err => console.log(  err));
  });*/
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
  /*
  io.sockets.on('connection', function (socket) {
    
        var q = "SELECT DISTINCT fecha, SUM(up) as ups, SUM(down) as down FROM noti_tweet "
           +" GROUP BY (fecha)";
        database.query(q)
        .then(row => {
            data1 = row;
            console.log("este es la respuesta barras")
            console.log(data1)
            //console.log(row)
            io.sockets.emit('barras', {barras: [...data1]});
        })
        .catch(err => console.log(  err));
      });
     */ 

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
    console.log('Server running on port 3001');
})
//pure-ethos-325501
