"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Archivo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ArchivoSchema = new Schema({
    nombre: {
        type: String,
        dropDups: true
    },
    extencion: {
        type: String
    },
    id_contenedor: {
        type: String
    },
    permisos: {
        type: Number,
        default: 777,
    },
    id_propietario: {
        type: String
    },
}, { timestamps: true });
ArchivoSchema.index({ nombre: 1, extencion: 1, id_contenedor: 1, id_propietario: 1 }, { unique: true });
exports.Archivo = mongoose_1.default.models.Carpeta ||
    mongoose_1.default.model("Archivo", ArchivoSchema);
exports.default = exports.Archivo;
