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

const login = (req,res)=>{
    res.status(200).json({msg:"Usuario logueado"})
}

const confirmemail = (req,res)=>{
    res.status(200).json({msg:"Usuario confirmado"})
}

export {
    register,
    login,
    confirmemail
}