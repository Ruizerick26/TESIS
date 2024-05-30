import Usuario from "../models/Usuario.js"
import Moderador from '../models/Moderador.js'
import Reportes from "../models/Reportes.js"
import mongoose from "mongoose"
import generarJWT from "../helpers/crearJWT.js"
import {sendMailtoNewModer, sendMailToRecoveryPassword} from '../config/nodemailer.js'
import Publicacion from "../models/Publicacion.js"


const registrar = async(req,res) =>{

    const {email} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"}) 

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
const login = async(req,res) =>{

    const {email,password} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const verificarM = await Moderador.findOne({email})
    if(!verificarM) return res.status(404).json({msg:"Lo sentimos, Correo no registrado"})

    const moderadorBDD = await Moderador.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(moderadorBDD.codigo != null) return res.status(200).json({msg:"Es necesario cambiar su contraseña por primera vez"})
      

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
    const {email,password, passwordnuevo, codigo} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const moderadorBDD = await Moderador.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(!moderadorBDD) return res.status(404).json({msg:"Moderador no registrado"})

    
    const verificarCodigo = await moderadorBDD.matchCode(codigo)
    if(!verificarCodigo) return res.status(404).json({msg:"Lo sentimos, el código es incorrecto"})
    
    const verificarPassword = await moderadorBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password antiguo no es el correcto"})

    moderadorBDD.password = await moderadorBDD.encrypPassword(passwordnuevo)
    moderadorBDD.codigo = null
    await moderadorBDD.save()

    res.status(200).json({msg: "Contraseña actualizada"})
}

const bloquearU = async(req,res) =>{

    const {id} = req.params

    const usuario = await Usuario.findById(id).select("-status -__v -token -updatedAt -createdAt")
    if(!usuario) return res.status(200).json({msg:"usuario no encontrado"})

    usuario.bloqueo = true
    await usuario.save()

    res.status(200).json({msg:"Usuario Bloqueado"})
}
const RestrinU = async(req,res) =>{

    const {id} = req.params

    const usuario = await Usuario.findById(id).select("-status -__v -token -updatedAt -createdAt")
    if(!usuario) return res.status(200).json({msg:"usuario no encontrado"})

    usuario.restriccion = true
    await usuario.save()

    res.status(200).json({msg:"Usuario restringido"})
}

//------------------------PROCESO DE RESOLVER REPORTES---------------------------
const eliminarPublicacion = async(req,res) =>{

    const {id} = req.params

    const reporte = await Reportes.findById(id).select("-status -__v -token -updatedAt -createdAt")
    if(!reporte) return res.status(404).json({msg:"no se encontro el reporte"})

    const idP = await Publicacion.findById(reporte.idPublicacion).select("_id")

    await Publicacion.findByIdAndDelete(idP)

    reporte.estado = "Resuelto"

    await reporte.save()
    res.status(200).json({msg:"Publicación Bloqueada"})
}
const falsoReporte = async(req,res) =>{
    const {id} = req.params

    const reporte = await Reportes.findById(id).select("-status -__v -token -updatedAt -createdAt")
    if(!reporte) return res.status(404).json({msg:"no se encontro el reporte"})

    reporte.estado = "Resuelto"

    await reporte.save()
    res.status(200).json({msg:"Publicación Bloqueada"})
}
const cambio = async(req,res) =>{
    const {id} = req.params

    const reporte = await Reportes.findById(id).select("-status -__v -token -updatedAt -createdAt")
    reporte.estado = "Borrado"

    await reporte.save()
    res.status(200).json({msg:"cambiado de estado por eliminación"})
}

const reporte = async(req,res) =>{
    const {id} = req.params

    const reporte = await Reportes.findById(id).select("-status -__v -token -updatedAt -createdAt")
    if(!reporte) return res.status(404).json({msg:"no se encontro el reporte"})
    const publicacion = await Publicacion.findById(reporte.idPublicacion).select("-status -__v -token -updatedAt -createdAt") 
    if(!publicacion){
        res.status(200).json({reporte, msg : "La publicación a sido borrada"})
    }else{
        res.status(200).json({reporte,publicacion})
    }
}
const usuarioReportes = async (req,res) =>{
    
    const {id} = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});

    const usuario = await Usuario.findById(id)
    if(!usuario) return res.status(200).json({msg:"usuario no encontrado"})
    
    const usuarioReportes = await Reportes.find({}).where("usuarioId").equals(id)

    res.status(200).json(usuarioReportes)
}
const nReportes = async(req,res) =>{
    const reportes = await Reportes.find({})
    res.status(200).json(reportes)
}

const usuarios = async (req,res) =>{
    const usuarios = await Usuario.find({}).where('confirmar').equals(true)
    res.status(200).json(usuarios)
}


//-----------------------------------FIN------------------------------------------

const moderadores = async(req,res) =>{
    const moderadores = await Moderador.find({}).where('codigo').equals(null)
    res.status(200).json(moderadores)
}

const moderadoresEliminar = async(req,res) =>{
    const {id} = req.params
    
    const moderador = await Moderador.findById(id)

    if(moderador.super === true) return res.status(200).json({msg:"Este moderador no puede ser eliminado"})

    if(!moderador) return res.status(404).json({msg:"No se a encontrado el moderador"})

    await Moderador.findByIdAndDelete(id)
    res.status(200).json({msg:"Moderador eliminado"})
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
    console.log(token)

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
    nReportes,
    usuarios,
    actualizarC,
    recuperaCon,
    comprobarRecuperacion,
    nuevaContraseña,
    contraNuevaI,
    moderadores,
    moderadoresEliminar,
    usuarioReportes,
    reporte,
    RestrinU,
    falsoReporte,
    cambio
}