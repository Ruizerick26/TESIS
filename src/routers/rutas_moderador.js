import {Router} from 'express'
import {registrar,
        login,
        bloquearU,
        eliminarPublicacion,
        notificacionesReportes,
        usuarios,
        actualizarC
} from '../controllers/moderador_Controler.js'
import verificarAutentication from '../middlewares/autentication.js'

const router = Router()

//Rutas publicas
router.post('/login/moderador',login)

//Rutas privadas
router.put('/actualizar/moderador/:id',verificarAutentication,actualizarC)
router.delete('/eliminar/publicacion/:id',verificarAutentication,eliminarPublicacion)
router.put('/bloquear/usuario/:id',verificarAutentication,bloquearU)
router.get('/notificaciones/moderador/:id',verificarAutentication,notificacionesReportes)
router.get('/listar/usuarios',verificarAutentication,usuarios)

//Ruta Moderador para registrar
router.post('/registrar/moderador/:id',verificarAutentication,registrar)


export default router
