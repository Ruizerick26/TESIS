import Usuario from "../models/Usuario.js"
import Moderador from '../models/Moderador.js'
import mongoose from "mongoose"
import generarJWT from "../helpers/crearJWT.js"


const registrar = async(req,res) =>{

    const {id} = req.params

    const {email} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"}) 

    if(id === '663d5da0af5dba7ccf1384f1') {
        const Bemail = await Moderador.findOne({email})
        if(Bemail) return res.status(404).json({msg:"moderador registrado"})

        const Uemail = await Usuario.findOne({email})
        if(Uemail) return res.status(404).json({msg:"Email registrado en la aplicación"})
        
        const password = Math.random().toString(36).substring(2,12)
        const codigo = Math.random().toString(36).substring(2,12)

        console.log(password)
        console.log(codigo)

        const moderadorN = await Moderador(req.body)
        moderadorN.password = await moderadorN.encrypPassword(password)
        moderadorN.codigo = await moderadorN.encrypCode(codigo)


        await moderadorN.save()
        return res.status(200).json({msg:"Registrado el moderador"})    
    }
    else return res.status(404).json({msg:"No puede ingresar a este ENDPOINT"})
    
}
const login = async(req,res) =>{

    const {email,password,codigo} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const moderadorBDD = await Moderador.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(!moderadorBDD) return res.status(404).json({msg:"Moderador no registrado"})

    const verificarPassword = await moderadorBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Contraseña incorrecta"})
    
    const verificarCodigo = await moderadorBDD.matchCode(codigo)
    if(!verificarCodigo) return res.status(404).json({msg:"Codigo incorrecto"})

    const token = generarJWT(moderadorBDD._id,"moderador")
    const {nombre,apellido,_id} = moderadorBDD
        
    res.status(200).json({
        token,
        nombre,
        apellido,
        _id
    })
}

const bloquearU = (req,res) =>{
    res.status(200).json({msg:"Bloquear"})
}
const eliminarPublicacion = (req,res) =>{
    res.status(200).json({msg:"Eliminar publicacion"})
}
const notificacionesReportes = (req,res) =>{
    res.status(200).json({msg:"Notificaciones Reportes"})
}
const usuarios = (req,res) =>{
    res.status(200).json({msg:"Mostrar usuarios"})
}
const actualizarC = (req,res) =>{
    res.status(200).json({msg:"Actualizar contraseña"})
}
export{
    registrar,
    login,
    bloquearU,
    eliminarPublicacion,
    notificacionesReportes,
    usuarios,
    actualizarC
}