import Notificacion from "../models/Notificacion.js"


//Notificaciones Usuario
const crearNotifiacionL=async(id)=>{
    const mensaje = "Le dieron like a tu publicación"
    const tipo = "A alguien le gusta tu publicación"

    const Noti = new Notificacion

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.usuarioID = id

    await Noti.save()
    console.log("notificación Creada")
}
const crearNotifiacionDL=async(id)=>{
    const mensaje = "Le dieron dislike a tu publicación"
    const tipo = "A alguien no le gusta tu publicación"

    const Noti = new Notificacion

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.usuarioID = id

    await Noti.save()
    console.log("notificación Creada")
}
const crearNotifiacionReporte=async(id)=>{
    const mensaje = "Reportaron tu publicación"
    const tipo = "Parece que has sido reportado, los moderadore se encargaran de esto"

    const Noti = new Notificacion

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.usuarioID = id

    await Noti.save()
    console.log("notificación Creada")
}


//Notificación Moderador 
const crearNotifiacionModerador=async()=>{
    const mensaje = "Nuevo Reporte"
    const tipo = "Existe un nuevo reporte en el sistema"

    const Noti = new Notificacion

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.usuarioID = null

    await Noti.save()
    console.log("notificación Creada")
}
const crearNotifiacionRes=async(id,tiempo)=>{
    const mensaje = "Cuenta Restringida"
    const tipo = `Cuenta Restringida por un periodo de ${tiempo}`

    const Noti = new Notificacion

    Noti.tipo = tipo
    Noti.mensaje = mensaje
    Noti.usuarioID = id

    await Noti.save()
    console.log("notificación Creada")
}

export {
    crearNotifiacionL,
    crearNotifiacionDL,
    crearNotifiacionReporte,
    crearNotifiacionModerador,
    crearNotifiacionRes
}