let MySqli = require('mysqli');

/*
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'X22448899+'
app.config['MYSQL_DATABASE_DB'] = 'gcpdb'
app.config['MYSQL_DATABASE_HOST'] = '35.226.60.144'
mysql.init_app(app)*/

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