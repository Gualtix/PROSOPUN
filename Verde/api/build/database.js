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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConn = exports.OracleConn = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const keys_1 = __importDefault(require("./keys"));
//import { PlatInfo } from './models';
class OracleConn {
    constructor() {
        //public info: PlatInfo | undefined;
        this.CNN = null;
    }
    DoQuery(QString, QJSon) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                /*
                oracledb.initOracleClient
                ({
                    libDir: '/Users/cjones/instantclient_19_3',  // On Windows use double backslashes for each dir separator: 'c:\\instantclient_19_8'
                    configDir: '/Users/cjones/q/Cloud/ATP-S-CJJSON'
                });
                */
                this.CNN = yield oracledb_1.default.getConnection(keys_1.default.database);
                oracledb_1.default.autoCommit = true;
                result = yield this.CNN.execute(QString, QJSon, // Binds
                {
                    outFormat: oracledb_1.default.OBJECT
                });
            }
            catch (err) {
                console.error(err);
            }
            finally {
                if (this.CNN) {
                    try {
                        this.CNN.release(function (err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                        //await this.CNN.close();
                        //console.log("conexion cerradalalalal");        
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            }
            //console.log(result);
            return result;
        });
    }
}
exports.OracleConn = OracleConn;
exports.DBConn = new OracleConn();
exports.default = exports.DBConn;
