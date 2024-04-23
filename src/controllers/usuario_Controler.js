import Usuario from '../models/Usuario.js'
import generarJWT from '../helpers/crearJWT.js'
import mongoose from 'mongoose'
import { sendMailToUser, sendMailToRecoveryPassword } from '../config/nodemailer.js'
import moment from 'moment'
 
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
    await nuevoUsuario.save()

    res.status(200).json({msg:"Revisa tu correo electronico"})
}

const login = async (req,res)=>{
    const {email, password} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const UsuarioBDD = await Usuario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(!UsuarioBDD) return res.status(404).json({msg:"Usuario no registrado"})

    if(UsuarioBDD?.confirmar === false) return res.status(404).json({msg:"Debes confirmar tu cuenta primero"})

    const VerificarPassword = await UsuarioBDD.matchPassword(password)
    if(!VerificarPassword) return res.status(404).json({msg:"Contraseña incorrecta"})

    const token = generarJWT(UsuarioBDD._id,"Usuario")
    const {nombre,apellido,_id,genero,fechaNacimiento} = UsuarioBDD

    res.status(200).json({
        token,
        _id,
        nombre,
        apellido,
        genero,
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

    const UsuarioBDD = Usuario.findOne({email})
    if(!UsuarioBDD) return res.status(404).json({msg:"Lo sentimos, Correo no registrado"})
    
    const token = UsuarioBDD.crearToken()
    UsuarioBDD.token = token

    await sendMailToRecoveryPassword(email,token)
    await UsuarioBDD.save()

    res.status(200).json({msg:"Revisa tu correo para restablecer tu contraseña"})
}


const comprobarRecuperacion = async(req,res)=>{

    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const UsuarioBDD = await Usuario.findOne({token:req.params.token})
    if(UsuarioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await UsuarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}


const nuevaContraseña = async(req,res)=>{
    const{password,confirmpassword} = req.body

    Object.entries(Object.values(req.body)).length ===0 ? console.log("esta vacio"):console.log("esta lleno")
    if (Object.entries(Object.values(req.body)).length ===0) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})

    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    
    const UsuarioBDD = await Usuario.findOne({token:req.params.token})
    if(UsuarioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    
    UsuarioBDD.token = null
    UsuarioBDD.password = await UsuarioBDD.encrypPassword(password)
    await UsuarioBDD.save()
    
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}


const actualizarPassword = async(req,res)=>{
    const {passwordactual,passwordnuevo} = req.body

    const UsuarioBDD = await Usuario.findById(req.UsuarioBDD._id)
    if(!UsuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Usuario ${id}`})

    const verificarPassword = await UsuarioBDD.matchPassword(passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})

    UsuarioBDD.password = await UsuarioBDD.encrypPassword(passwordnuevo)
    await UsuarioBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}
const perfil = async(req,res)=>{
    const {id} = req.params

    const UsuarioBDD = await Usuario.findById(id)
    if(!UsuarioBDD) return res.status(404).json({msg:"Error al buscar el usuario"})

    res.status(200).json({UsuarioBDD})
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
    UsuarioBDD.fechaNacimiento = req.body.fechaNacimiento ||  UsuarioBDD?.fechaNacimiento
    UsuarioBDD.genero = req.body.genero || UsuarioBDD?.genero
    await UsuarioBDD.save()

    res.status(200).json({msg:"Perfil actualizado correctamente"})
}

export {
    register,
    login,
    confirmemail,
    recuperaCon,
    comprobarRecuperacion,
    nuevaContraseña,
    actualizarPassword,
    perfil,
    actualizarPerfil
}