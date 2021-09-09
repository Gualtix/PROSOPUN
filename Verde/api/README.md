# prodoserver

### Inicio
    npm init --yes

### Express
    npm i express morgan cors

### TypeScript
    npm install -g typescript
    
    Crear archivo de configuracion para TypeScript: tsc --init
    Crear Carpeta build y modificar en tsconfig.json:
    "outDir": "./build"

    npm i @types/express -D

### Automatizar: tsc
    En package.json

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "tsc -w"
    }

    Ejecutar con: npm run build

### Automatizar: ejecucion de index.js

    npm i nodemon -D

    En package.json

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "tsc -w",
        "dev": "nodemon build/index.js"
    }

    Ejecutar con: npm run dev

### Instalando Moragn y CORS
    npm i @types/morgan @types/cors -D

    Ejecutar con: npm run 

### Instalando Body Parser
    npm install body-parser
    npm install @types/oracledb


### Oracle
    npm install oracledb -–save

### Autonomous DB
    neft
    Admin
    Aspx12345678+

    


