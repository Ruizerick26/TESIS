import NotificacionU from "../models/NotificacionU.js"
import NotificacionM from '../models/NotificacionM.js'


//Notificaciones Usuario
const crearNotifiacionL=async( nombreE, url,id,foto,idP)=>{
    const mensaje = "dio like a tu publicación"
    const tipo = "Noti"

    const Noti = new NotificacionU

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.nombreE = nombreE
    Noti.urlPu= url
    Noti.usuarioID = id
    Noti.perfil = foto
    Noti.publiID = idP

    await Noti.save()
    console.log("notificación Creada")
}

//Notificación Moderador 
const crearNotifiacionModerador=async(reportado,reportante,id)=>{
    const mensaje = "Nuevo Reporte"

    const Noti = new NotificacionM

    Noti.mensaje = mensaje
    Noti.Reportado = reportado
    Noti.Reportante = reportante
    Noti.idReportado = id

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
    Noti.publiID = null

    await Noti.save()
    console.log("notificación Creada")
}

export {
    crearNotifiacionL,
    crearNotifiacionModerador,
    crearNotifiacionRes
}