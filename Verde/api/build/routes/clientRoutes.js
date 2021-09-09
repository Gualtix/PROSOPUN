"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
class ClientRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/delete', clientController_1.clientController.delete_client);
        this.router.post('/update', clientController_1.clientController.update_client);
        this.router.get('/fetch_clients', clientController_1.clientController.fetch_clients);
        this.router.post('/new', clientController_1.clientController.new_client);
    }
}
const clientRoutes = new ClientRoutes();
exports.default = clientRoutes.router;
