import {Router} from 'express'
import {
    register,
    login,
    confirmemail,
    recuperaCon,
    nuevaContraseña,
    actualizarPassword,
    perfil,
    actualizarPerfil,
    actualizarFoto,
    enviarCorreo
} from '../controllers/usuario_Controler.js'
import verificarAutentication  from '../middlewares/autentication.js'
import upload from '../middlewares/multer.js'
import {validacionFormulario,validacionPublicacion,validacionContraU,validacionActualizar} from '../middlewares/validacionFormularios.js'
import {verificarBloqueo, verificarB} from '../middlewares/bloqueosUsuarios.js'
import {verNotifiacionU} from '../controllers/notificacion_controler.js'
  

   
const router = Router()


//rutas publicas
router.post('/login', verificarBloqueo, login)
router.post('/register',validacionFormulario, register)
router.get('/confirmar/:token', confirmemail)
router.post('/recuperar', recuperaCon)
//router.get('/recuperar/:token', comprobarRecuperacion)
router.post('/nuevopassword',validacionContraU, nuevaContraseña)

//ruta para probar correos
router.post('/enviarcorreo',enviarCorreo)


//rutas PRIVADAS
router.put('/usuario/actualizarPassword',verificarAutentication,validacionContraU, actualizarPassword)
router.get('/usuario/:id',verificarAutentication,verificarB, perfil)
router.put('/usuario/:id',verificarAutentication, validacionActualizar, actualizarPerfil)
router.put('/usuario/foto/:id',upload.single('image'),actualizarFoto)
router.get('/usuario/notificaciones/:id',verificarAutentication,verificarB,verNotifiacionU)

export default router