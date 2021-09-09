import mongoose, { Document, Model } from "mongoose";
const Schema = mongoose.Schema;

const ArchivoSchema = new Schema(
  {
    nombre: {
      type: String,
      dropDups: true
    },
    extencion: {
        type: String
    },
    id_contenedor: {
      type: String
    },
    permisos: {
      type: Number,  
      default: 777,
    },
    id_propietario: { 
      type: String
    },   
  },
  { timestamps: true }
);
              
ArchivoSchema.index({ nombre: 1,extencion:1, id_contenedor: 1,id_propietario: 1}, { unique: true });

export interface IArchivo extends Document {
  nombre: string;
  extencion: string;
  id_contenedor: string;
  permisos?: number;
  id_propietario: string;
}


export const Archivo =
  (mongoose.models.Carpeta as Model<IArchivo>) ||
  mongoose.model<IArchivo>("Archivo", ArchivoSchema);
export default Archivo;

