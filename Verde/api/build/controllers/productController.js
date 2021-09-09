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
exports.productController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductController {
    index(req, res) {
        res.json({ text: 'API is in AliStorage' });
    }
    new_product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            let Params = req.body;
            console.log(Params.date);
            let QString = "SELECT * FROM USUARIO WHERE fecha_nacimiento > TO_DATE('"+Params.date+"','YYYY/DD/MM')";
            let result = await Orcon.DoQuery(QString,[]);
    
            let FAG:any = [];
    
            let i = 0;
            let n = result.rows.length;
            while(i < n){
                let ID = i;
                ID++;
                let tmp = result.rows[i];
                FAG.push({id:ID,nombre:tmp.NOMBRE,nacimiento:tmp.FECHA_NACIMIENTO});
                i++;
            }
            res.json(FAG);
            */
        });
    }
    new_prod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Nit = "";
            let Client = req.body;
            console.log(Client);
            //let QString = "SELECT * FROM USUARIO WHERE fecha_nacimiento > TO_DATE('"+Params.date+"','YYYY/DD/MM')";
            let QString = `INSERT INTO CLIENT
        (nit,name,address,email,phone)
        VALUES 
        (
            '${Nit}',
            '${Client.name}',
            '${Client.address}',
            '${Client.email}',
            '${Client.phone}'
        )`;
            let result = yield database_1.default.DoQuery(QString, []);
            //let result = {ok:'ok'};
            res.json(result);
        });
    }
}
exports.productController = new ProductController;
