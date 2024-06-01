import {Router} from 'express'
import {
    register,
    login,
    confirmemail,
    recuperaCon,
    comprobarRecuperacion,
    nuevaContraseña,
    actualizarPassword,
    perfil,
    actualizarPerfil,
    actualizarFoto
} from '../controllers/usuario_Controler.js'
import verificarAutentication  from '../middlewares/autentication.js'
import upload from '../middlewares/multer.js'
import {validacionFormulario,validacionPublicacion,validacionContraU,validacionActualizar} from '../middlewares/validacionFormularios.js'


   
const router = Router()


//rutas publicas
router.post('/login', login)
router.post('/register',validacionFormulario, register)
router.get('/confirmar/:token', confirmemail)
router.post('/recuperar', recuperaCon)
router.get('/recuperar/:token', comprobarRecuperacion)
router.post('/nuevopasword',validacionContraU, nuevaContraseña)

//rutas PRIVADAS
router.put('/usuario/actualizarPassword',verificarAutentication,validacionContraU, actualizarPassword)
router.get('/usuario/:id',verificarAutentication, perfil)
router.put('/usuario/:id',verificarAutentication, validacionActualizar, actualizarPerfil)
router.put('/usuario/foto/:id',upload.single('image'),validacionPublicacion,actualizarFoto)


export default router