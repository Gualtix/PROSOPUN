import { Router } from 'express';
import { carpetaController } from '../controllers/carpetaController';

class CarpetatRoutes {

    public router: Router = Router();

    constructor()
    {
        this.config();
    }
    
    config(): void 
    {
        this.router.post('/delete_carpeta', carpetaController.delete_carpeta);
        this.router.post('/new_carpeta', carpetaController.new_carpeta);
        this.router.post('/fetch_carpetas', carpetaController.fetch_carpetas);
        this.router.post('/rename_carpeta', carpetaController.rename_carpeta);
        this.router.post('/move', carpetaController.move);
    }
}

const carpetaRoutes = new CarpetatRoutes();
export default carpetaRoutes.router;