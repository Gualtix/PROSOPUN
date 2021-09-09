import mongoose, { Document, Model } from "mongoose";
const Schema = mongoose.Schema;

const CarpetaSchema = new Schema(
  {
    nombre: {
      type: String,
      dropDups: true
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
              
CarpetaSchema.index({ nombre: 1, id_contenedor: 1,id_propietario: 1}, { unique: true });


export interface ICarpeta extends Document {
  nombre: string;
  id_contenedor: string;
  permisos?: number;
  id_propietario: string;
}


export const Carpeta =
  (mongoose.models.Carpeta as Model<ICarpeta>) ||
  mongoose.model<ICarpeta>("Carpeta", CarpetaSchema);
export default Carpeta;

