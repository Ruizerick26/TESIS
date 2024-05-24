import Usuario from "../models/Usuario.js";
import Moderador from "../models/Moderador.js";

const verificarSuper = async(req,res,next) =>{

    try{
    const moderador = await Moderador.findById(req.moderadorBDD._id).select("-status -__v -token -updatedAt -createdAt")

    if(moderador.super === true) return next()

    if(moderador.super === false) return res.status(404).json({msg:"Usuario no permitido"})

    }catch(error){
        const e = new Error("Formato de token invalido")
        console.log(e)
        return res.status(404).json({msg: e.message})
    }

}

export default verificarSuper