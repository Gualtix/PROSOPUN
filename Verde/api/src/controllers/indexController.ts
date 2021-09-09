import { Request, Response } from 'express';

class IndexController {
    public hola(req: Request, res: Response) {
        res.json({text: 'AYD2 API :V'});
    }

    public push_tweet(req: Request, res: Response) {
        console.log(req.body);
        res.json(req.body);
    }
}
export const indexController = new IndexController;   