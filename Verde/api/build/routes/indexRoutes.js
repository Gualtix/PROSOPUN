"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.hola);
        this.router.post('/push_tweet', indexController_1.indexController.push_tweet);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
