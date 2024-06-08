import Notificacion from "../models/Notificacion.js"
import mongoose from "mongoose";

const verNotifiacionU = async(req,res)=>{
    const {id} = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const notifiaciones = await Notificacion.find({usuarioID:id}) 

    res.status(200).json(notifiaciones)
}
const verNotificacionM = async(req,res) =>{
    const notifiaciones = await Notificacion.find({usuarioID: null})

    res.status(200).json(notifiaciones)
}


export {
    verNotifiacionU,
    verNotificacionM
}
