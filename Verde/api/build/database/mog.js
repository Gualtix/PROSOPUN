"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConn = exports.MongoConn = void 0;
const MONGO_USERNAME = "ayd2_admin16082021";
const MONGO_PASSWORD = "suWK#[G6~EnA%2F%!d";
//const MONGO_PASSWORD = "suWK#[G6~EnA/%!d";
const MONGO_HOSTNAME = "18.220.123.74";
const MONGO_PORT = "27017";
const MONGO_DB = "ayd2";
//const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
class MongoConn {
    constructor() {
    }
    Connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                console.log('Connecting to MongoDB... :v');
                //this.Client = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });  
                console.log('MongoDB Connected!!!!');
            }
            catch (err) {
                console.error(err);
            }
            return result;
        });
    }
}
exports.MongoConn = MongoConn;
exports.DBConn = new MongoConn();
exports.default = exports.DBConn;
