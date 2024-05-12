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

const router = Router()


//rutas publicas
router.post('/login', login)
router.post('/register', register)
router.get('/confirmar/:token', confirmemail)
router.post('/recuperar', recuperaCon)
router.get('/recuperar/:token', comprobarRecuperacion)
router.post('/nuevopasword', nuevaContraseña)

//rutas PRIVADAS

router.put('/usuario/actualizarPassword',verificarAutentication, actualizarPassword)
router.get('/usuario/:id',verificarAutentication, perfil)
router.put('/usuario/:id',verificarAutentication, actualizarPerfil)
router.put('/usuario/foto/:id',actualizarFoto)


export default router