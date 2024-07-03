import Usuario from '../models/Usuario.js'
import generarJWT from '../helpers/crearJWT.js'
import mongoose from 'mongoose'
import { sendMailToUser, sendMailToRecoveryPassword,sendMailtoDeletePublic } from '../config/nodemailer.js'
import moment from 'moment'
import Publicacion from '../models/Publicacion.js'
import {deleteImage, uploadImageP} from '../config/cloudinary.js'
import fs from 'fs-extra'
 
moment.suppressDeprecationWarnings = true

const register = async(req,res)=>{
    const {email,password, fechaNacimiento} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const buscarEmail = await Usuario.findOne({email})
    if(buscarEmail) return res.status(404).json({msg:"Lo sentimos, correo ya registrado"})

    const validarfecha = moment(fechaNacimiento).isAfter('2008-1-1')
    if(validarfecha) return res.status(404).json({msg:"La fecha es erronea "})
    
    const nuevoUsuario = await Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)


    const token = nuevoUsuario.crearToken()
    await sendMailToUser(email,token)
    
    
    const fotoperfil = await uploadImageP('./src/assets/fotoDefault.png')
   
    nuevoUsuario.fotoperfil = {
        public_id: fotoperfil.public_id,
        secure_url: fotoperfil.secure_url
    }

    await nuevoUsuario.save()

    res.status(200).json({msg:"Revisa tu correo electronico"})
   
}

const login = async (req,res)=>{

    const {email, password} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const UsuarioBDD = await Usuario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(!UsuarioBDD) return res.status(404).json({msg:"Usuario no registrado"})

    UsuarioBDD.token = null
    UsuarioBDD.fechaCodigo = null

    if(UsuarioBDD?.confirmar === false) return res.status(404).json({msg:"Debes confirmar tu cuenta primero"})

    const VerificarPassword = await UsuarioBDD.matchPassword(password)
    if(!VerificarPassword) return res.status(404).json({msg:"Contraseña incorrecta"})

    const token = generarJWT(UsuarioBDD._id,"usuario")
    const {nombre,apellido,_id,fechaNacimiento} = UsuarioBDD

    UsuarioBDD.save()

    res.status(200).json({
        token,
        _id,
        nombre,
        apellido,
        fechaNacimiento,
        email: UsuarioBDD.email
    })
}

const confirmemail = async (req,res)=>{

    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})

    const usuarioBDD = await Usuario.findOne({token:req.params.token})
    if(!usuarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})


    usuarioBDD.token = null
    usuarioBDD.confirmar=true
    await usuarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 

}

const recuperaCon = async (req,res)=>{
    const {email} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const UsuarioBDD = await Usuario.findOne({email})
    if(!UsuarioBDD) return res.status(404).json({msg:"Lo sentimos, Correo no registrado"})
    
    if(UsuarioBDD.token != null) return res.status(404).json({msg:"Ya tienes un código de recuperacion en tu correo"})
    
    const token = Math.random().toString(36).substring(2,8)
    UsuarioBDD.token = token
    const fechaN = moment(Date.now())
    UsuarioBDD.fechaCodigo = fechaN
    console.log(moment(fechaN).format('LLL'))

    await sendMailToRecoveryPassword(email,token)
    await UsuarioBDD.save()

    res.status(200).json({msg:"Revisa tu correo para restablecer tu contraseña"})
}



const nuevaContraseña = async(req,res)=>{
    const{codigo,password,confirmpassword} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

        
    const UsuarioBDD = await Usuario.findOne({token:codigo})

    if(UsuarioBDD === null) return res.status(404).json({msg:"Este código en invalido"})

    const verfecha = moment(UsuarioBDD.fechaCodigo).add(24,"hours").format('LLL')
    const fechab = moment(Date.now()).format('LLL')


    if(verfecha < fechab){
        UsuarioBDD.token = null
        UsuarioBDD.save()
        return res.status(404).json({msg:"Lo sentimos el código a caducado, vuelve a enviar tu correo para restablecer tu contraseña"})
    }

    if(!UsuarioBDD.token === codigo) return res.status(404).json({msg:"Lo sentimos el codigo, es incorrecto"})
    
    
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
            
    UsuarioBDD.token = null
    UsuarioBDD.fechaCodigo = null
    UsuarioBDD.password = await UsuarioBDD.encrypPassword(password)
    await UsuarioBDD.save()
    
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}


const actualizarPassword = async(req,res)=>{
    try{
    const {passwordactual,password} = req.body

    const usuarioBDD = await Usuario.findById(req.usuarioBDD._id)
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Usuario ${id}`})

    const verificarPassword = await usuarioBDD.matchPassword(passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})

    usuarioBDD.password = await usuarioBDD.encrypPassword(password)
    await usuarioBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
    }catch(error){
        console.log(error)
    }
}
const perfil = async(req,res)=>{
    
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el usuario ${id}`});

    const UsuarioBDD = await Usuario.findById(id).select("-createdAt -updatedAt -__v -token -confirmar -email")
    
    if(!UsuarioBDD) return res.status(404).json({msg:"Error al buscar el usuario"})

    const publicacionBDD = await Publicacion.find({}).where('usuarioID').equals(id)

    const conteo = publicacionBDD.length
    
    res.status(200).json({UsuarioBDD,publicacionBDD,"Cantidad":conteo})
}
const actualizarPerfil = async(req,res)=>{
    const {id} = req.params


    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    
    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})


    const UsuarioBDD = await Usuario.findById(id)
    if(!UsuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Usuario ${id}`})
    
	UsuarioBDD.nombre = req.body.nombre || UsuarioBDD?.nombre
    UsuarioBDD.apellido = req.body.apellido  || UsuarioBDD?.apellido
    UsuarioBDD.descripcion = req.body.descripcion || UsuarioBDD?.descripcion

    await UsuarioBDD.save()

    res.status(200).json({msg:"Perfil actualizado correctamente"})
}
const actualizarFoto = async(req,res) =>{
    const {id} = req.params
    
    const usuarioBDD = await Usuario.findById(id)
    if(!usuarioBDD) return res.status(404).json({msg:"Usuario no encontrado"})
    
   

    if(!(req.file?.path)) return res.status(404).json({msg:"Debes subir una imagen"})
   
    const fotoActual = await Usuario.findById(id).select('fotoperfil')

    await deleteImage(fotoActual.fotoperfil.public_id)

    const fotonueva = await uploadImageP(req.file.path)
    
    usuarioBDD.fotoperfil.public_id = fotonueva.public_id
    usuarioBDD.fotoperfil.secure_url = fotonueva.secure_url
    
    await fs.unlink(req.file.path)
    await usuarioBDD.save()
    

    res.status(200).json({msg:"Foto de perfil actualizada"})

}

const enviarCorreo = async(req,res) =>{
    const {email,token} = req.body
    
    await sendMailToUser(email,token)
    res.status(200).json({msg:"correo enviado"})
}

export {
    register,
    login,
    confirmemail,
    recuperaCon,
    nuevaContraseña,
    actualizarPassword,
    perfil,
    actualizarPerfil,
    actualizarFoto,
    enviarCorreo
}