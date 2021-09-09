"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carpetaController_1 = require("../controllers/carpetaController");
class CarpetatRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/delete_carpeta', carpetaController_1.carpetaController.delete_carpeta);
        this.router.post('/new_carpeta', carpetaController_1.carpetaController.new_carpeta);
        this.router.post('/fetch_carpetas', carpetaController_1.carpetaController.fetch_carpetas);
        this.router.post('/rename_carpeta', carpetaController_1.carpetaController.rename_carpeta);
        this.router.post('/move', carpetaController_1.carpetaController.move);
    }
}
const carpetaRoutes = new CarpetatRoutes();
exports.default = carpetaRoutes.router;
