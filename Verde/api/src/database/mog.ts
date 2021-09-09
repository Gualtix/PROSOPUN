import mongoose from "mongoose";


const MONGO_USERNAME = "ayd2_admin16082021";
const MONGO_PASSWORD = "suWK#[G6~EnA%2F%!d";
//const MONGO_PASSWORD = "suWK#[G6~EnA/%!d";
const MONGO_HOSTNAME = "18.220.123.74";
const MONGO_PORT     = "27017";
const MONGO_DB       = "ayd2";


//const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

export class MongoConn{

    DataBase:any;
    Client:any;
    
    constructor() 
    {

    }  

    public async Connect(): Promise<any>{

        let result:any;

        try
        {
            console.log('Connecting to MongoDB... :v');
            //this.Client = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });  
              
            console.log('MongoDB Connected!!!!');    
        } 
        catch (err) 
        {  
            console.error(err);       
        } 
    
        return result; 
    }         
}

export const DBConn = new MongoConn();  
export default DBConn;

