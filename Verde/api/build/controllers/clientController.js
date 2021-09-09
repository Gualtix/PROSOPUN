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
exports.clientController = void 0;
const database_1 = __importDefault(require("../database"));
class ClientController {
    index(req, res) {
        res.json({ text: 'API is in AliStorage' });
    }
    fetch_clients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let QString = `SELECT * FROM CLIENT`;
            let result = yield database_1.default.DoQuery(QString, []);
            res.json(result.rows);
        });
    }
    delete_client(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Client = req.body;
            //console.log(Client);       
            let QString = `DELETE FROM CLIENT WHERE CLIENT.ID = '${Client.ID}'`;
            let result = yield database_1.default.DoQuery(QString, []);
            res.json(result);
        });
    }
    update_client(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Nit = "";
            let Client = req.body;
            //console.log(Client);
            let QString = `UPDATE CLIENT SET
        nit     = '${Nit}',
        name    = '${Client.NAME}',
        address = '${Client.ADDRESS}',
        email   = '${Client.EMAIL}',
        phone   = '${Client.PHONE}'
        WHERE CLIENT.id = '${Client.ID}'`;
            //console.log(QString);
            let result = yield database_1.default.DoQuery(QString, []);
            res.json(result);
        });
    }
    new_client(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Nit = "";
            let Client = req.body;
            let QString = `INSERT INTO CLIENT
        (nit,name,address,email,phone)
        VALUES 
        (
            '${Nit}',
            '${Client.NAME}',
            '${Client.ADDRESS}',        
            '${Client.EMAIL}',
            '${Client.PHONE}'      
        )`;
            let result = yield database_1.default.DoQuery(QString, []);
            //let result = {ok:'ok'};
            res.json(result);
        });
    }
}
exports.clientController = new ClientController;
