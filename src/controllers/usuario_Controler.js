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

export {
    register,
    login,
    confirmemail
}