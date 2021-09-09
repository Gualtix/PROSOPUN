import { Request, Response } from 'express';

class IndexController {
    public hola(req: Request, res: Response) {
        res.json({text: 'AYD2 API :V'});
    }

    public push_tweet(req: Request, res: Response) {
        //console.log(req.body);
        let result = {status:"ok",msg:"SUCCESSFUL DB QUERY",code:200};
                try 
        {
            res.json(result);   
            return;
        } catch (error) 
        {
            result.status = "error";
            result.msg    = error.message;
            result.code   = 500;    
        }
        res.json(result); 
    }
}
export const indexController = new IndexController;    