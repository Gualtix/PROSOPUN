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
exports.archivoController = void 0;
const archivo_1 = require("../models/archivo");
const mongoose_1 = __importDefault(require("mongoose"));
class ArchivoController {
    index(req, res) {
        res.json({ text: 'API is in AliStorage' });
    }
    new_archivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { msg: "", id: "", success: false };
            try {
                let nombre = req.body.nombre;
                let newArchivo;
                if (nombre != "root") {
                    if (req.body.id_contenedor == "") {
                        req.body.id_contenedor = null;
                    }
                    //let tmp = await Archivo.findById(req.body.id_contenedor);
                    //ObjectId.fromString( myObjectIdString );
                    //var mongoose = require('mongoose');
                    var objectId = mongoose_1.default.Types.ObjectId(req.body.id_contenedor);
                    //let tmp = await Archivo.find({_id:req.body.id_contenedor});
                    let tmp = yield archivo_1.Archivo.findById(objectId);
                    console.log(tmp);
                    if (tmp == null) {
                        result.msg = "La Carpeta Contenedora No Existe";
                        result.id = "";
                        result.success = false;
                        res.json(result);
                        return;
                    }
                }
                newArchivo = yield new archivo_1.Archivo(req.body).save();
                result.msg = "Archivo: " + req.body.nombre + " Creada Exitosamente";
                result.id = newArchivo._id;
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
    rename_archivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* *** IMPORTANTE ***
            Archivo.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre },{new: true},
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
                const tmp = yield archivo_1.Archivo.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre }, { new: true });
                if (tmp == null) {
                    result.msg = "La Archivo No Existe";
                    result.success = false;
                    res.json(result);
                    return;
                }
                result.msg = "Archivo Renombrada Exitosamente";
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
    fetch_archivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let archivos = null;
            let result = { msg: "", success: false, archivos };
            try {
                let cnt = yield archivo_1.Archivo.findById(req.body.id_contenedor);
                if (cnt == null) {
                    result.msg = "La Archivo Contenedora No Existe";
                    result.success = false;
                    result.archivos = null;
                    res.json(result);
                    return;
                }
                let tmp = yield archivo_1.Archivo.find({ id_contenedor: req.body.id_contenedor });
                result.msg = "Archivo Contenedora Encontrada con Exito";
                result.success = true;
                result.archivos = tmp;
                res.json(result);
                return;
            }
            catch (error) {
                console.log(error);
                result.msg = error.message;
                result.success = false;
                result.archivos = null;
            }
            res.json(result);
        });
    }
    delete_archivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { msg: "", success: false };
            try {
                let tmp = yield archivo_1.Archivo.findByIdAndRemove(req.body.id).exec();
                if (tmp == null) {
                    result.msg = "La Archivo No Existe";
                    result.success = false;
                }
                else {
                    result.msg = "Archivo Eliminada Exitosamente";
                    result.success = true;
                }
            }
            catch (error) {
                console.log(error);
            }
            res.json(result);
        });
    }
}
exports.archivoController = new ArchivoController;
