import { Request, Response } from 'express';
import {Carpeta, ICarpeta} from '../models/carpeta';
import {Archivo, IArchivo} from '../models/archivo';
//import DBConn from './database/mog';

class CarpetaController {
    
    public index(req: Request, res: Response) {
        res.json({text: 'API is in AliStorage'});
    }

    public async new_carpeta(req: Request, res: Response):Promise<void> 
    {
        let result = {msg:"",id:"",success:false};
        try 
        {
            let nombre:string = req.body.nombre;
            let newCarpeta:any;
            if(nombre != "root")
            {
                if(req.body.id_contenedor == ""){
                    req.body.id_contenedor = null;   
                }
                let tmp = await Carpeta.findById(req.body.id_contenedor);
                console.log(tmp);
                if(tmp == null)
                {
                    result.msg = "La Carpeta Contenedora No Existe";
                    result.id = "";
                    result.success = false;     
                    res.json(result);
                    return;
                }

            }
            newCarpeta = await new Carpeta(req.body).save();
            result.msg = "Carpeta: "+req.body.nombre+" Creada Exitosamente";
            result.id = newCarpeta._id;
            result.success = true;   

        } catch (error) { 
            console.log(error.message);

            result.msg = error.message;
            result.id  = "";
            result.success = false;  
        }   
        res.json(result); 
    }

    public async rename_carpeta(req: Request, res: Response):Promise<void> 
    {
        /* *** IMPORTANTE ***
        Carpeta.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre },{new: true},
        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
        });
        */

        let result = {msg:"",success:false};     
        try 
        {
            const tmp = await Carpeta.findByIdAndUpdate(req.body.id,{nombre:req.body.nombre},{new: true});
            if(tmp == null)
            {
                result.msg = "La Carpeta No Existe";
                result.success = false;
                res.json(result);    
                return;
            }
            result.msg = "Carpeta Renombrada Exitosamente";
            result.success = true;
        } catch (error) {
            console.log(error);  
            result.msg = error.message;
            result.success = false;  
        }
        res.json(result);             
    }

    public async fetch_carpetas(req: Request, res: Response):Promise<void> 
    {
        let carpetas:any = null;
        let result = {msg:"",success:false,carpetas}; 
        try {
            let cnt = await Carpeta.findById(req.body.id_contenedor);  
            if(cnt == null){
                result.msg = "La Carpeta Contenedora No Existe";
                result.success = false
                result.carpetas = null;
                res.json(result);
                return;
            }
            let tmp = await Carpeta.find({id_contenedor: req.body.id_contenedor});
            result.msg = "Carpeta Contenedora Encontrada con Exito";
            result.success = true
            result.carpetas = tmp;
            res.json(result); 
            return; 
            
        } catch (error) {
            console.log(error);  
            result.msg = error.message;
            result.success = false;
            result.carpetas = null; 
        } 
        res.json(result); 
    }

    public async delete_carpeta(req: Request, res: Response):Promise<void> 
    {
        let result = {msg:"",success:false};
        try 
        {
            let tmp = await Carpeta.findByIdAndRemove(req.body.id).exec();
            if(tmp == null){
                result.msg = "La Carpeta No Existe";
                result.success = false;
            }
            else{
                result.msg = "Carpeta Eliminada Exitosamente";
                result.success = true;
            }

        } catch (error) {
             console.log(error);
        }
   
        res.json(result);   
    }

    public async move(req: Request, res: Response):Promise<void> 
    {
        let result = {msg:"",success:false};
        try 
        {
            if(req.body.type == "carpeta"){
                let tmp = await Carpeta.findByIdAndUpdate(req.body.id_victima,{id_contenedor:req.body.id_destino},{new: true});
                result.msg = "Carpeta Movida Exitosamente";
                result.success = true;
            }
            else{
                let tmp = await Archivo.findByIdAndUpdate(req.body.id_victima,{id_contenedor:req.body.id_destino},{new: true});
                result.msg = "Archivo Movido Exitosamente";
                result.success = true;
            }

        } catch (error) {
             console.log(error);
             result.msg = error.message;
             result.success = false;
        }
   
        res.json(result);   
    }
}

export const carpetaController = new CarpetaController;