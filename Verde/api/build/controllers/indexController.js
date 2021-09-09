"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    hola(req, res) {
        res.json({ text: 'AYD2 API :V' });
    }
    push_tweet(req, res) {
        console.log(req.body);
        let result = { status: "ok", msg: "SUCCESSFUL DB QUERY", code: 200 };
        try {
            res.json(result);
            return;
        }
        catch (error) {
            result.status = "error";
            result.msg = error.message;
            result.code = 500;
        }
        res.json(result);
    }
}
exports.indexController = new IndexController;
