import Publicacion from "../models/Publicacion.js";
import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";
import {uploadImage, deleteImage} from '../config/cloudinary.js'

const publicacionesGlobales = async(req,res)=>{
    const publicacionBDD = await Publicacion.find({}).select("imagen descripcion usuarioID")
    const nombre = await Usuario.find({}).where("_id").equals(publicacionBDD.usuarioID)
    console.log(nombre)
    res.status(200).json(publicacionBDD)
} 
const publicar = async(req,res)=>{

    const {descripcion, temporada, anio, genero,estilo} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const publicacion = new Publicacion
    publicacion.descripcion = descripcion
    publicacion.usuarioID = req.usuarioBDD._id
    publicacion.estilo.temporada = temporada
    publicacion.estilo.anio = anio
    publicacion.estilo.genero = genero
    publicacion.estilo.estilo = estilo

    if(!(req.files?.path)) return res.status(404).json({msg:"Debes subir una imagen"})
    const imagenUpload = await uploadImage(req.file.path)

    publicacion.imagen = {
        public_id: imagenUpload.public_id,
        secure_url: imagenUpload.secure_url
    }
    await publicacion.save()
    res.status(200).json({msg:"Publicado"})
}
const actualizarPublicacion = (req,res)=>{
    res.status(200).json({msg:"Publicaciones globales"})
}
const publicacionUnica = async (req,res)=>{
    const {id} = req.params
    const publicacionU = await Publicacion.findById(id).select('-createdAt -updatedAt -__v')
    if(!publicacionU) return res.status(404).json({msg:"No se a encontrado la publicación"})

    res.status(200).json(publicacionU)
}
const BorrarPublicacion = async(req,res)=>{
    const {id} = req.params

    const publicacion = await Publicacion.findByIdAndDelete(id)
    if(!publicacion) return res.status(404).json({msg:"No se a encontrado la publicación"})
    await deleteImage(publicacion.imagen.public_id)

    res.status(200).json({msg:"Publicación borrada"})
}


export {
    publicacionesGlobales,
    publicar,
    actualizarPublicacion,
    publicacionUnica,
    BorrarPublicacion
}