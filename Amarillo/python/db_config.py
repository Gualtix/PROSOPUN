from app import app

from flaskext.mysql import MySQL

mysqla = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '12345678'
app.config['MYSQL_DATABASE_DB'] = 'semi1'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysqla.init_app(app)
