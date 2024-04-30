import Publicacion from "../models/Publicacion.js";
import mongoose from "mongoose";


const publicacionesGlobales = (req,res)=>{
    res.status(200).json({msg:"Publicaciones globales"})
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