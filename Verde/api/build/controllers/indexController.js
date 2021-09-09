"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    hola(req, res) {
        res.json({ text: 'AYD2 API :V' });
    }
    push_tweet(req, res) {
        console.log(req.body);
        res.json(req.body);
    }
}
exports.indexController = new IndexController;
