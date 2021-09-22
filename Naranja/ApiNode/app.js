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
//mensaje de recepcion del Sub
io.sockets.on('connection',(socket)=>{
    console.log('nueva conexcion: ');
    
    
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
    console.log('dentro');
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
io.sockets.on('connection', function (socket) {
  //socket.emit('greeting', 'Hello');
  console.log("dentro de consulta")
 // var uid = data['uid'];
  var q = "SELECT * FROM noti_tweet WHERE id = 0 ORDER BY id DESC LIMIT 1";

  database.query(q)
  .then(row => {
      data1 = row;
      console.log("este es la respuesta")
      console.log(row)
      io.sockets.emit('consulta1', {consulta: [...data1]});
      //console.log("entro aca");
  })
  
  .catch(err => console.log(  err));

});
*/

io.sockets.on('connection', (socket) => {
    id = socket;
    console.log('entro');
    console.log(socket.id)
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

        //socket.emit('ReEnvio',{ReEnvio:mensaje});
},500);//tiempo del servidor

server.listen(3001, () => {
    console.log('Server running on port 3001');
})