import Usuario from "../models/Usuario.js";
import moment from "moment";

const verificarRestrin = async(req,res,next) =>{

    try{
        const usuarioV = await Usuario.findById(req.usuarioBDD._id).select('-createdAt -updatedAt -__v')
        
        if(usuarioV.tiempoR != null){
            const tiempo = moment(usuarioV.tiempoR).format("LLL")
            const ac = moment(Date.now()).format("LLL")
           
            if(moment(tiempo).isBefore(ac)) {
                console.log("entro")
                usuarioV.restriccion = false
                await usuarioV.save()
            }
        }

        const usuarioA = await Usuario.findById(req.usuarioBDD._id).select('-createdAt -updatedAt -__v')

        if(usuarioA.restriccion === true) return res.status(200).json({msg:"Su cuenta esta restringida"})

        if(usuarioA.restriccion === false) return next()
    }catch(error){
        console.log(error)
        return res.status(404).json({error: error})
    }
}

const verificarBloqueo = async (req,res,next) => {
    const {email} = req.body
    try{
        const usuario = await Usuario.findOne({email})
        if(!usuario) return res.status(404).json({msg:"cuenta no registrada"})
        
        if(usuario.bloqueo === true) return res.status(200).json({msg:"Su cuenta esta bloqueada"})

        if(usuario.bloqueo === false) return next()
    }catch(error){
        console.log(error)
        return res.status(404).json({error:error})
    }
}

const verificarB = async (req,res,next)=>{
    try{
        const usuario = await Usuario.findById(req.usuarioBDD._id)
        if(usuario.bloqueo === true) return res.status(200).json({msg:"Usuario Bloqueado"})
        if(usuario.bloqueo === false) return next()
    }catch(error){
        console.log(error)
    }
}

export {
    verificarBloqueo,
    verificarRestrin,
    verificarB
}