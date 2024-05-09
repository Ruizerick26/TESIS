import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'
import Moderador from '../models/Moderador.js'

const verificarAutentication = async (req,res,next)=>{
    if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"}) 

    const {authorization} = req.headers
    
    try{
        const{id,rol} = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        
        if(rol === "usuario"){
            req.usuarioBDD = await Usuario.findById(id).lean().select("-password")
            next()
        }
        else if(rol === "moderador"){
            req.moderadorBDD = await Moderador.findById(id).lean().select("-password")
            next()
        }

    }catch(error){
        const e = new Error("Formato de token invalido")
        console.log(e)
        return res.status(404).json({msg: e.message})
    }
}

export default verificarAutentication