from app import app

from flaskext.mysql import MySQL

mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'X22448899+'
app.config['MYSQL_DATABASE_DB'] = 'gcpdb'
app.config['MYSQL_DATABASE_HOST'] = '35.226.60.144'
mysql.init_app(app)
