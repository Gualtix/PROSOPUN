import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import {Archivo, IArchivo} from '../models/archivo';
import mongoose from "mongoose";


class ArchivoController {
    
    public index(req: Request, res: Response) {
        res.json({text: 'API is in AliStorage'});
    }

    public async new_archivo(req: Request, res: Response):Promise<void> 
    {
        let result = {msg:"",id:"",success:false};
        try 
        {
            let nombre:string = req.body.nombre;
            let newArchivo:any;
            if(nombre != "root")
            {
                if(req.body.id_contenedor == ""){
                    req.body.id_contenedor = null;   
                }

                //let tmp = await Archivo.findById(req.body.id_contenedor);
                //ObjectId.fromString( myObjectIdString );
                //var mongoose = require('mongoose');
                var objectId = mongoose.Types.ObjectId(req.body.id_contenedor);
                //let tmp = await Archivo.find({_id:req.body.id_contenedor});
                let tmp = await Archivo.findById(objectId);
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
            newArchivo = await new Archivo(req.body).save();
            result.msg = "Archivo: "+req.body.nombre+" Creada Exitosamente";
            result.id = newArchivo._id;
            result.success = true;   

        } catch (error) { 
            console.log(error.message);

            result.msg = error.message;
            result.id  = "";
            result.success = false;  
        }   
        res.json(result); 
    }

    public async rename_archivo(req: Request, res: Response):Promise<void> 
    {
        /* *** IMPORTANTE ***
        Archivo.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre },{new: true},
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
            const tmp = await Archivo.findByIdAndUpdate(req.body.id,{nombre:req.body.nombre},{new: true});
            if(tmp == null)
            {
                result.msg = "La Archivo No Existe";
                result.success = false;
                res.json(result);    
                return;
            }
            result.msg = "Archivo Renombrada Exitosamente";
            result.success = true;
        } catch (error) {
            console.log(error);  
            result.msg = error.message;
            result.success = false;  
        }
        res.json(result);             
    }

    public async fetch_archivos(req: Request, res: Response):Promise<void> 
    {
        let archivos:any = null;
        let result = {msg:"",success:false,archivos}; 
        try {
            let cnt = await Archivo.findById(req.body.id_contenedor);  
            if(cnt == null){
                result.msg = "La Archivo Contenedora No Existe";
                result.success = false
                result.archivos = null;
                res.json(result);
                return;
            }
            let tmp = await Archivo.find({id_contenedor: req.body.id_contenedor});
            result.msg = "Archivo Contenedora Encontrada con Exito";
            result.success = true
            result.archivos = tmp;
            res.json(result); 
            return; 
            
        } catch (error) {
            console.log(error);  
            result.msg = error.message;
            result.success = false;
            result.archivos = null; 
        } 
        res.json(result); 
    }

    public async delete_archivo(req: Request, res: Response):Promise<void> 
    {
        let result = {msg:"",success:false};
        try 
        {
            let tmp = await Archivo.findByIdAndRemove(req.body.id).exec();
            if(tmp == null){
                result.msg = "La Archivo No Existe";
                result.success = false;
            }
            else{
                result.msg = "Archivo Eliminada Exitosamente";
                result.success = true;
            }

        } catch (error) {
             console.log(error);
        }
   
        res.json(result);   
    }
}

export const archivoController = new ArchivoController;