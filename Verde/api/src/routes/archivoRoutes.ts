import { Router } from 'express';
import { archivoController } from '../controllers/archivoController';

class ArchivoRoutes {

    public router: Router = Router();

    constructor()
    {
        this.config();
    }
    
    config(): void 
    {
        this.router.post('/delete_archivo', archivoController.delete_archivo);
        this.router.post('/new_archivo', archivoController.new_archivo);
        this.router.post('/fetch_archivos', archivoController.fetch_archivos);
        this.router.post('/rename_archivo', archivoController.rename_archivo);
    }
}  

const archivoRoutes = new ArchivoRoutes();
export default archivoRoutes.router;