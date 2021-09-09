"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivoController_1 = require("../controllers/archivoController");
class ArchivoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/delete_archivo', archivoController_1.archivoController.delete_archivo);
        this.router.post('/new_archivo', archivoController_1.archivoController.new_archivo);
        this.router.post('/fetch_archivos', archivoController_1.archivoController.fetch_archivos);
        this.router.post('/rename_archivo', archivoController_1.archivoController.rename_archivo);
    }
}
const archivoRoutes = new ArchivoRoutes();
exports.default = archivoRoutes.router;
