import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'
import Moderador from '../models/Moderador.js'

const verificarAutentication = async (req,res,next)=>{
    if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"}) 

    const {authorization} = req.headers

    console.log(authorization)
    
    try{
        const{id,rol} = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        
        if(rol === "usuario"){
            req.usuarioBDD = await Usuario.findById(id).lean().select("-password")

            const usuarioV = await Usuario.findById(req.usuarioBDD._id).select('-createdAt -updatedAt -__v')
        
            if(usuarioV.tiempoR != null){
                const tiempo = moment(usuarioV.tiempoR).format("LLL")
                const ac = moment(Date.now()).format("LLL")
            
                if(moment(tiempo).isBefore(ac)) {
                    usuarioV.restriccion = false
                    await sendMailtoDesReg(usuarioV.email)
                    await usuarioV.save()
                }
            }
            next()
        }
        else if(rol === "moderador"){
            req.moderadorBDD = await Moderador.findById(id).lean().select("-password")
            next()
        }

    }catch(error){
        const e = new Error("Formato de token invalido")
        console.log(e)
        console.log("////////////////////////")
        console.log(error)
        return res.status(404).json({msg: e.message})
    }
}

export default verificarAutentication