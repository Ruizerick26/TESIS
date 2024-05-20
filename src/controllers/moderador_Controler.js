import Usuario from "../models/Usuario.js"
import Moderador from '../models/Moderador.js'
import mongoose from "mongoose"
import generarJWT from "../helpers/crearJWT.js"
import {sendMailtoNewModer, sendMailToRecoveryPassword} from '../config/nodemailer.js'


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

        await sendMailtoNewModer(email,password,codigo)
        await moderadorN.save()
        return res.status(200).json({msg:"Registrado el moderador"})    
    }
    else return res.status(404).json({msg:"No puede ingresar a este ENDPOINT"})
    
}
const login = async(req,res) =>{

    const {email,password} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const moderadorBDD = await Moderador.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(!moderadorBDD) return res.status(404).json({msg:"Moderador no registrado"})

    if(moderadorBDD.codigo != null) {
        res.redirect(process.env.URL_BACKEND + "/moderador/contraseñaInicial")
    }

    const verificarPassword = await moderadorBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Contraseña incorrecta"})
    

    const token = generarJWT(moderadorBDD._id,"moderador")
    const {nombre,apellido,_id} = moderadorBDD
        
    res.status(200).json({
        token,
        nombre,
        apellido,
        _id
    })
}
const contraNuevaI = async(req,res) =>{
    const {email,password, passwordNuevo, codigo} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const moderadorBDD = await Moderador.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(!moderadorBDD) return res.status(404).json({msg:"Moderador no registrado"})

    
    const verificarCodigo = await moderadorBDD.matchCode(codigo)
    if(!verificarCodigo) return res.status(404).json({msg:"Lo sentimos, el código es incorrecto"})
    
    const verificarPassword = await moderadorBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password antiguo no es el correcto"})

    moderadorBDD.password = await moderadorBDD.encrypPassword(passwordNuevo)
    moderadorBDD.codigo = null
    await moderadorBDD.save()

    res.status(200).json({msg: "Contraseña actualizada"})
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
const usuarios = async (req,res) =>{
    const usuarios = await Usuario.find({}).where('confirmar').equals(true)
    res.status(200).json(usuarios)
}
const actualizarC = async (req,res) =>{
    const {passwordactual,passwordnuevo} = req.body

    const moderadorBDD = await Moderador.findById(req.moderadorBDD._id)
    if(!moderadorBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Moderador ${id}`})

    const verificarPassword = await moderadorBDD.matchPassword(passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})

    moderadorBDD.password = await moderadorBDD.encrypPassword(passwordnuevo)
    await moderadorBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}
const recuperaCon = async (req,res)=>{
    const {email} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const moderadorBDD = await Moderador.findOne({email})
    if(!moderadorBDD) return res.status(404).json({msg:"Lo sentimos, Correo no registrado"})
    
    const token = moderadorBDD.crearToken()
    moderadorBDD.token = token

    await sendMailToRecoveryPassword(email,token)
    await moderadorBDD.save()

    res.status(200).json({msg:"Revisa tu correo para restablecer tu contraseña"})
}


const comprobarRecuperacion = async(req,res)=>{

    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const moderadorBDD = await Moderador.findOne({token:req.params.token})
    if(moderadorBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await moderadorBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}


const nuevaContraseña = async(req,res)=>{
    const{password,confirmpassword} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    
    const moderadorBDD = await Moderador.findOne({token:req.params.token})
    if(moderadorBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    
    moderadorBDD.token = null
    moderadorBDD.password = await moderadorBDD.encrypPassword(password)
    await moderadorBDD.save()
    
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}
export{
    registrar,
    login,
    bloquearU,
    eliminarPublicacion,
    notificacionesReportes,
    usuarios,
    actualizarC,
    recuperaCon,
    comprobarRecuperacion,
    nuevaContraseña,
    contraNuevaI
}