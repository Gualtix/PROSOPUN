import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
//import { User } from './models/carpeta';

import DBConn from './database/mog';
import indexRoutes from './routes/indexRoutes';

class Server{

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();   
        DBConn.Connect(); 
    }

    config(): void{

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
            });  
         

        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        //this.DBTest();  
    }

    public async DBTest(): Promise<any>{
        
    }      

    routes(): void{
        this.app.use('/',indexRoutes);
    }

    start(): void
    {
        this.app.listen(this.app.get('port'),() => {
            console.log('Server on Port:',this.app.get('port'));
        });
    }
}

const server = new Server();
server.start(); 