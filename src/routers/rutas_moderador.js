import {Router} from 'express'
import {registrar,
        login,
        bloquearU,
        eliminarPublicacion,
        notificacionesReportes,
        usuarios,
        actualizarC,
        recuperaCon,
        comprobarRecuperacion,
        nuevaContraseña,
        contraNuevaI,
        moderadores,
        moderadoresEliminar
} from '../controllers/moderador_Controler.js'
import verificarAutentication from '../middlewares/autentication.js'
import verificarModerador from '../middlewares/moderadorSuper.js'
import {validacionModerador,validacionContra,validacionContraU} from '../middlewares/validacionFormularios.js'


const router = Router()

//Rutas publicas
router.post('/login/moderador',login)
router.post('/moderador/recuperar', recuperaCon)
router.get('/moderador/recuperar/:token', comprobarRecuperacion)
router.post('/moderador/nuevopasword/:token',validacionContraU, nuevaContraseña)
router.put('/moderador/password/inicial',validacionContra,contraNuevaI)

//Rutas privadas
router.put('/actualizar/moderador/:id',verificarAutentication,validacionContra,actualizarC)
router.delete('/eliminar/publicacion/:id',verificarAutentication,eliminarPublicacion)
router.put('/bloquear/usuario/:id',verificarAutentication,bloquearU)
router.get('/notificaciones/moderador/:id',verificarAutentication,notificacionesReportes)
router.get('/listar/usuarios',verificarAutentication,usuarios)

//Rutas de moderador super
router.post('/registrar/moderador',verificarAutentication,verificarModerador,validacionModerador,registrar)
router.get('/moderadores',verificarAutentication,verificarModerador,moderadores)
router.delete('/moderador/eliminar/:id',verificarAutentication,verificarModerador,moderadoresEliminar)


export default router
