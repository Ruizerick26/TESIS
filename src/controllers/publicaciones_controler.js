import Publicacion from "../models/Publicacion.js";
import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";

const publicacionesGlobales = async(req,res)=>{
    const publicacionBDD = await Publicacion.find({}).select("imagen descripcion usuarioID")

    res.status(200).json(publicacionBDD)
}
const publicar = (req,res)=>{
    res.status(200).json({msg:"Publicaciones globales"})
}
const actualizarPublicacion = (req,res)=>{
    res.status(200).json({msg:"Publicaciones globales"})
}
const publicacionUnica = (req,res)=>{
    res.status(200).json({msg:"Publicaciones globales"})
}
const BorrarPublicacion = (req,res)=>{
    res.status(200).json({msg:"Publicaciones globales"})
}


export {
    publicacionesGlobales,
    publicar,
    actualizarPublicacion,
    publicacionUnica,
    BorrarPublicacion
}