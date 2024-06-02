import Usuario from "../models/Usuario.js";

const verificarRestrin = async(req,res) =>{

    try{
        const usuarioV = await Usuario.findById(req.usuarioBDD._id).select('-createdAt -updatedAt -__v')

        if(usuarioV.restriccion === true) return res.status(200).json({msg:"Su cuenta esta restringida"})

        if(usuarioV.restriccion === false) return next()
    }catch(error){
        console.log(error)
        return res.status(404).json({error: error})
    }
}

const verificarBloqueo = async (req,res) => {
    const {email} = req.body
    try{
        const usuarioV = await Usuario.find({email: email}).select('-createdAt -updatedAt -__v')

        if(usuarioV.bloqueo === true) return res.status(200).json({msg:"Su cuenta esta bloqueada"})

        if(usuarioV.bloqueo === false) return next()
    }catch(error){
        console.log(error)
        return res.status(404).json({error:error})
    }
}

export {
    verificarBloqueo,
    verificarRestrin
}