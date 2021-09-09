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
exports.carpetaController = void 0;
const carpeta_1 = require("../models/carpeta");
const archivo_1 = require("../models/archivo");
//import DBConn from './database/mog';
class CarpetaController {
    index(req, res) {
        res.json({ text: 'API is in AliStorage' });
    }
    new_carpeta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { msg: "", id: "", success: false };
            try {
                let nombre = req.body.nombre;
                let newCarpeta;
                if (nombre != "root") {
                    if (req.body.id_contenedor == "") {
                        req.body.id_contenedor = null;
                    }
                    let tmp = yield carpeta_1.Carpeta.findById(req.body.id_contenedor);
                    console.log(tmp);
                    if (tmp == null) {
                        result.msg = "La Carpeta Contenedora No Existe";
                        result.id = "";
                        result.success = false;
                        res.json(result);
                        return;
                    }
                }
                newCarpeta = yield new carpeta_1.Carpeta(req.body).save();
                result.msg = "Carpeta: " + req.body.nombre + " Creada Exitosamente";
                result.id = newCarpeta._id;
                result.success = true;
            }
            catch (error) {
                console.log(error.message);
                result.msg = error.message;
                result.id = "";
                result.success = false;
            }
            res.json(result);
        });
    }
    rename_carpeta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* *** IMPORTANTE ***
            Carpeta.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre },{new: true},
            function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
            }
            });
            */
            let result = { msg: "", success: false };
            try {
                const tmp = yield carpeta_1.Carpeta.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre }, { new: true });
                if (tmp == null) {
                    result.msg = "La Carpeta No Existe";
                    result.success = false;
                    res.json(result);
                    return;
                }
                result.msg = "Carpeta Renombrada Exitosamente";
                result.success = true;
            }
            catch (error) {
                console.log(error);
                result.msg = error.message;
                result.success = false;
            }
            res.json(result);
        });
    }
    fetch_carpetas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let carpetas = null;
            let result = { msg: "", success: false, carpetas };
            try {
                let cnt = yield carpeta_1.Carpeta.findById(req.body.id_contenedor);
                if (cnt == null) {
                    result.msg = "La Carpeta Contenedora No Existe";
                    result.success = false;
                    result.carpetas = null;
                    res.json(result);
                    return;
                }
                let tmp = yield carpeta_1.Carpeta.find({ id_contenedor: req.body.id_contenedor });
                result.msg = "Carpeta Contenedora Encontrada con Exito";
                result.success = true;
                result.carpetas = tmp;
                res.json(result);
                return;
            }
            catch (error) {
                console.log(error);
                result.msg = error.message;
                result.success = false;
                result.carpetas = null;
            }
            res.json(result);
        });
    }
    delete_carpeta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { msg: "", success: false };
            try {
                let tmp = yield carpeta_1.Carpeta.findByIdAndRemove(req.body.id).exec();
                if (tmp == null) {
                    result.msg = "La Carpeta No Existe";
                    result.success = false;
                }
                else {
                    result.msg = "Carpeta Eliminada Exitosamente";
                    result.success = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            res.json(result);
        });
    }
    move(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { msg: "", success: false };
            try {
                if (req.body.type == "carpeta") {
                    let tmp = yield carpeta_1.Carpeta.findByIdAndUpdate(req.body.id_victima, { id_contenedor: req.body.id_destino }, { new: true });
                    result.msg = "Carpeta Movida Exitosamente";
                    result.success = true;
                }
                else {
                    let tmp = yield archivo_1.Archivo.findByIdAndUpdate(req.body.id_victima, { id_contenedor: req.body.id_destino }, { new: true });
                    result.msg = "Archivo Movido Exitosamente";
                    result.success = true;
                }
            }
            catch (error) {
                console.log(error);
                result.msg = error.message;
                result.success = false;
            }
            res.json(result);
        });
    }
}
exports.carpetaController = new CarpetaController;
