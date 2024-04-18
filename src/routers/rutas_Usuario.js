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


const router = Router()


//rutas publicas
router.post('/login', login)
router.post('/register', register)
router.get('/confirmar/:token', confirmemail)
router.post('/recuperar', recuperaCon)
router.get('/recuperar/:token', comprobarRecuperacion)
router.post('/nuevopasword', nuevaContraseña)

//rutas PRIVADAS

router.put('/usuario/actualizarPassword', actualizarPassword)
router.put('/usuario/:id', perfil)
router.get('/usuario/:id', actualizarPerfil)

export default router