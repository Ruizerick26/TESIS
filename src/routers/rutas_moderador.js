import {Router} from 'express'
import {registrar,
        login,
        bloquearU,
        eliminarPublicacion,
        nReportes,
        usuarios,
        actualizarC,
        recuperaCon,
        comprobarRecuperacion,
        nuevaContraseña,
        contraNuevaI,
        moderadores,
        moderadoresEliminar,
        usuarioReportes,
        reporte,
        falsoReporte,
        RestrinU,
        cambio,
        desbloquearU,
        desRestrinU,
        verUsuarioNoC,
        borrarUsuarioN,
        modersN
} from '../controllers/moderador_Controler.js'
import verificarAutentication from '../middlewares/autentication.js'
import verificarModerador from '../middlewares/moderadorSuper.js'
import {validacionModerador,validacionContra,validacionContraU} from '../middlewares/validacionFormularios.js'
import {verNotificacionM} from '../controllers/notificacion_controler.js'



const router = Router()

//Rutas publicas
router.post('/login/moderador',login)
router.post('/moderador/recuperar', recuperaCon)
router.get('/moderador/recuperar/:token', comprobarRecuperacion)
router.post('/moderador/nuevopasword/:token',validacionContraU, nuevaContraseña)
router.put('/moderador/password/inicial',validacionContra,contraNuevaI)

//Rutas privadas
router.put('/actualizar/moderador/:id',verificarAutentication,validacionContra,actualizarC)
//rutas para ver todos los usaurios y todos los reportes
router.get('/listar/usuarios',verificarAutentication,usuarios)
router.get('/moderador/reportes',verificarAutentication,nReportes) 
router.get('/moderador/notificaciones',verificarAutentication,verNotificacionM)
router.get('/listar/usuario/noconfirmado',verificarAutentication,verUsuarioNoC)
router.delete('/borrar/usuario/No/:id',verificarAutentication,borrarUsuarioN)

//rutas para ver los reportes de un usuario o un reporte en concreto
router.get('/moderador/reportes/:id',verificarAutentication,usuarioReportes)
router.get('/reporte/unico/:id',verificarAutentication,reporte)
 
//rutas para sancionar al usuario 
router.put('/bloquear/usuario/:id',verificarAutentication,bloquearU) 
router.put('/restringir/usuario/:id',verificarAutentication,RestrinU)
router.put('/desbloquear/usuario/:id',verificarAutentication,desbloquearU) 
router.put('/desrestringir/usuario/:id',verificarAutentication,desRestrinU)

//rutas para solucionar reportes
router.delete('/eliminar/publicacion/:id',verificarAutentication,eliminarPublicacion) 
router.put('/falso/usuario/:id',verificarAutentication,falsoReporte)
router.put('/cambio/estado/:id',verificarAutentication,cambio)

//Rutas de moderador super
router.post('/registrar/moderador',verificarAutentication,verificarModerador,validacionModerador,registrar)
router.get('/moderadores',verificarAutentication,verificarModerador,moderadores)
router.delete('/moderador/eliminar/:id',verificarAutentication,verificarModerador,moderadoresEliminar)
router.get('/moderador/sin/verificar',verificarAutentication,verificarModerador,modersN)


export default router
