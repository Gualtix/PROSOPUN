let MySqli = require('mysqli');


let conn = new MySqli({
    host: '35.226.60.144', //ip
    post: process.env.DB_SOCKET_PATH || '/cloudsql', //puerto
    user: 'root', //usuario de la base de datos
    passwd: 'X22448899+', // pass de la base de datos
    db: 'gcpdb' // nombre de la base de datso
});

let db = conn.emit(false, ''); //permiso a la base de datos

module.exports = {
    database: db
}