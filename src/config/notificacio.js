import NotificacionU from "../models/NotificacionU.js"
import NotificacionM from '../models/NotificacionM.js'


//Notificaciones Usuario
const crearNotifiacionL=async( nombreE, url,id)=>{
    const mensaje = "dio like a tu publicación"
    const tipo = "Noti"

    const Noti = new NotificacionU

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.nombreE = nombreE
    Noti.urlPu= url
    Noti.usuarioID = id

    await Noti.save()
    console.log("notificación Creada")
}
const crearNotifiacionDL=async( nombreE, url,id)=>{
    const mensaje = "dio dislike a tu publicación"
    const tipo = "Noti"

    const Noti = new NotificacionU

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.nombreE = nombreE
    Noti.urlPu= url
    Noti.usuarioID = id

    await Noti.save()
    console.log("notificación Creada")
}

//Notificación Moderador 
const crearNotifiacionModerador=async(reportado,reportante)=>{
    const mensaje = "Nuevo Reporte"

    const Noti = new NotificacionM

    Noti.mensaje = mensaje
    Noti.Reportado = reportado
    Noti.Reportante = reportante

    await Noti.save()
    console.log("notificación Creada")
}


const crearNotifiacionRes=async(id,tiempo)=>{
    const tipo = "Alerta"
    const mensaje = `Cuenta Restringida por un periodo de ${tiempo}`

    const Noti = new NotificacionU

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.usuarioID = id
    Noti.nombreE = null
    Noti.urlPu = null

    await Noti.save()
    console.log("notificación Creada")
}

export {
    crearNotifiacionL,
    crearNotifiacionDL,
    crearNotifiacionModerador,
    crearNotifiacionRes
}