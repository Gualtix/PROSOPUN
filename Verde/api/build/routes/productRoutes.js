"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
class ProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', productController_1.productController.index);
        this.router.post('/new', productController_1.productController.new_prod);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
