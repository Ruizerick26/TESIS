import Publicacion from "../models/Publicacion.js";
import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";
import {uploadImage, deleteImage} from '../config/cloudinary.js'
import fs from "fs-extra";
import Favoritos from "../models/Favoritos.js";
import Reportes from "../models/Reportes.js";


const publicacionesGlobales = async(req,res)=>{
    const publicacionBDD = await Publicacion.find({}).select("imagen descripcion usuarioID")
    const nombre = await Usuario.find({}).where("_id").equals(publicacionBDD.usuarioID)
    console.log(nombre)
    res.status(200).json(publicacionBDD)
} 
const publicar = async(req,res)=>{

    const {descripcion, temporada, anio, genero,estiloG} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const publicacion = new Publicacion
    publicacion.descripcion = descripcion
    publicacion.usuarioID = req.usuarioBDD._id
    publicacion.estilo.temporada = temporada
    publicacion.estilo.anio = anio
    publicacion.estilo.genero = genero
    publicacion.estilo.estiloG = estiloG    

    if(!(req.file?.path)) return res.status(404).json({msg:"Debes subir una imagen"})
    const imagenUpload = await uploadImage(req.file.path)

    publicacion.imagen = {
        public_id: imagenUpload.public_id,
        secure_url: imagenUpload.secure_url
    }
    await fs.unlink(req.file.path)
    await publicacion.save()
    res.status(200).json({msg:"Publicado"})
}
const actualizarPublicacion = async (req,res)=>{
    const {id} = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    
    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
        
    const publicacionBDD = await Publicacion.findById(id).select('-createdAt -updatedAt -__v')
    if(!publicacionBDD) return res.status(404).json({msg:"No se a encontrado la publicación"})
    
    publicacionBDD.descripcion = req.body.descripcion || publicacionBDD?.descripcion
    publicacionBDD.estilo.temporada = req.body.temporada || publicacionBDD?.estilo.temporada
    publicacionBDD.estilo.anio = req.body.anio || publicacionBDD?.estilo.anio
    publicacionBDD.estilo.genero = req.body.genero || publicacionBDD?.estilo.genero
    publicacionBDD.estilo.estiloG = req.body.estiloG || publicacionBDD?.estilo.estiloG

    await publicacionBDD.save()
    res.status(200).json({msg:"Publicación Actualizada"})
}
const publicacionUnica = async (req,res)=>{
    const {id} = req.params
    const publicacionU = await Publicacion.findById(id).select('-createdAt -updatedAt -__v')
    if(!publicacionU) return res.status(404).json({msg:"No se a encontrado la publicación"})

    res.status(200).json(publicacionU)
}
const BorrarPublicacion = async(req,res)=>{
    const {id} = req.params

    const publicacion = await Publicacion.findById(id)
    if(!publicacion) return res.status(404).json({msg:"No se a encontrado la publicación"})
    
    await Publicacion.findByIdAndDelete(id)
    await deleteImage(publicacion.imagen.public_id)

    res.status(200).json({msg:"Publicación borrada"})
}

const AgregarLike = async (req,res)=>{
    const {id} = req.params

    const publicacion = await Publicacion.findById(id)
    if(!publicacion) return res.status(404).json({msg:"No se econtro la publicación"})
    
    publicacion.likes = publicacion.likes + 1;

    await publicacion.save()

    res.status(200).json({msg:"Diste like"})
}
const AgregarDislike = async (req,res)=>{
    const {id} = req.params

    const publicacion = await Publicacion.findById(id)
    if(!publicacion) return res.status(404).json({msg:"No se econtro la publicación"})
    
    publicacion.dislike = publicacion.dislike + 1;

    await publicacion.save()

    res.status(200).json({msg:"Diste dislike"})
}
const eliminarLike = async (req,res)=>{
    const {id} = req.params

    const publicacion = await Publicacion.findById(id)
    if(!publicacion) return res.status(404).json({msg:"No se econtro la publicación"})
    
    if(publicacion.likes == 0){
        res.status(404).json({msg:"Error al quitar el like"})
    }else{
        publicacion.likes = publicacion.likes - 1;
    }
    await publicacion.save()

    res.status(200).json({msg:"Diste like"})
}
const EliminarDislike = async (req,res)=>{
    const {id} = req.params

    const publicacion = await Publicacion.findById(id)
    if(!publicacion) return res.status(404).json({msg:"No se econtro la publicación"})
    
    if(publicacion.dislike == 0){
        res.status(404).json({msg:"Error al quitar el like"})
    }else{
        publicacion.dislike = publicacion.dislike - 1;
    }
    await publicacion.save()

    res.status(200).json({msg:"Diste dislike"})
}

const agregarFavorito = async (req,res)=>{
    const {id} = req.params

    const ComprobarF = await Favoritos.find({$and : 
        [ {idPublicacion: {$eq :id}}, 
        {idUsuario: {$eq: req.usuarioBDD._id}}]
    })
    if(ComprobarF) return res.status(200).json({msg:"Ya tienes agregado a favoritos"})

    const nuevoFavorito = new Favoritos
    nuevoFavorito.idPublicacion = id
    nuevoFavorito.idUsuario = req.usuarioBDD._id

    await nuevoFavorito.save()
    res.status(200).json({msg:"Publicacion agregada a favoritos"})
}
const EliminarFavorito = async (req,res) =>{
    const {id} = req.params

    const buscarF = await Favoritos.findById(id)
    if(!buscarF) return res.status(404).json({msg:"No se a encontrado la publicación"})

    await Favoritos.findByIdAndDelete(id)
    res.status(200).json({msg:"Eliminaste de favoritos"})
}
const verFavoritos = async (req,res) =>{
    const {id} = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});

    const buscarF = await Favoritos.find({}).where('idUsuario').equals(id)

    res.status(200).json(buscarF)
}

const reporte = async(req,res) =>{
    const {id} = req.params
    const {motivo,detalle} = req.body

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    
    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
   
    const buscarP = await Publicacion.findById(id)
    if(!buscarP) return res.status(404).json({msg:"No se a encontrado la publicación"})

    const idUser = await Publicacion.findById(id).select("usuarioID")


    const nuevoReporte = await Reportes(req.body)

    nuevoReporte.idPublicacion = id
    nuevoReporte.idUsuario = idUser

    await nuevoReporte.saved()
    res.status(200).json({msg:"Reporte enviado"})
}


export {
    publicacionesGlobales,
    publicar,
    actualizarPublicacion,
    publicacionUnica,
    BorrarPublicacion,
    AgregarLike,
    AgregarDislike,
    agregarFavorito,
    eliminarLike,
    EliminarDislike,
    EliminarFavorito,
    reporte,
    verFavoritos
}