import os

settings = {
    'host': os.environ.get('ACCOUNT_HOST', 'https://sistemasoperativos.documents.azure.com:443/'),
    'master_key': os.environ.get('ACCOUNT_KEY', 'KpXECwtMz5yBzdWR7ufAea73rIoAzuwj0WF3M02P1GusmXXBVhnQfNfLhNmUXnRA0c4WDEDRN9qkDwoXNMjkUA=='),
    'database_id': os.environ.get('COSMOS_DATABASE', 'proyecto'),
    'container_id': os.environ.get('COSMOS_CONTAINER', 'Items'),
}