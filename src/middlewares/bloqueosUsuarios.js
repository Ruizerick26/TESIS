import Usuario from "../models/Usuario.js";

const verificarRestrin = async(req,res,next) =>{

    try{
        const usuarioV = await Usuario.findById(req.usuarioBDD._id).select('-createdAt -updatedAt -__v')
        
        if(usuarioV.restriccion === true) return res.status(200).json({msg:"Su cuenta esta restringida"})

        if(usuarioV.restriccion === false) return next()
    }catch(error){
        console.log(error)
        return res.status(404).json({error: error})
    }
}

const verificarBloqueo = async (req,res,next) => {
    const {email} = req.body
    try{
        const usuario = await Usuario.findOne({email})
        
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