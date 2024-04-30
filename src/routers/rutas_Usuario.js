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
    actualizarPerfil
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
router.put('/usuario/:id',verificarAutentication, perfil)
router.get('/usuario/:id',verificarAutentication, actualizarPerfil)


export default router