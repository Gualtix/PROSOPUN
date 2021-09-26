let MySqli = require('mysqli');

/*
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'X22448899+'
app.config['MYSQL_DATABASE_DB'] = 'gcpdb'
app.config['MYSQL_DATABASE_HOST'] = '35.226.60.144'
mysql.init_app(app)*/

const cosmos = require("@azure/cosmos");
const CosmosClient = cosmos.CosmosClient;

const endpoint = "['https://sistemasoperativos.documents.azure.com:443/']"; // Add your endpoint
const masterKey = "[KpXECwtMz5yBzdWR7ufAea73rIoAzuwj0WF3M02P1GusmXXBVhnQfNfLhNmUXnRA0c4WDEDRN9qkDwoXNMjkUA==]"; // Add the masterkey of the endpoint
const client = new CosmosClient({ endpoint, key: masterKey });
const dbId = 'proyecto' || process.env.COSMOS_DB;
const containerId = 'Items' || process.env.COSMOS_CONTAINER;

settings = {
    'host': os.environ.get('ACCOUNT_HOST', 'https://sistemasoperativos.documents.azure.com:443/'),
    'master_key': os.environ.get('ACCOUNT_KEY', 'KpXECwtMz5yBzdWR7ufAea73rIoAzuwj0WF3M02P1GusmXXBVhnQfNfLhNmUXnRA0c4WDEDRN9qkDwoXNMjkUA=='),
    'database_id': os.environ.get('COSMOS_DATABASE', 'proyecto'),
    'container_id': os.environ.get('COSMOS_CONTAINER', 'Items'),
}

let db2 = conn.emit(false, ''); //permiso a la base de datos

module.exports = {
    database2: db2
}