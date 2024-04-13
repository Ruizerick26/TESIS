import {Router} from 'express'
import {
    register,
    login,
    confirmemail
} from '../controllers/usuario_Controler.js'


const router = Router()


//rutas publicas
router.post('/login', login)
router.post('/register', register)
router.get('/confirmar/:token', confirmemail)
router.post('/recuperar', (res,req)=> res.send("Recuperar cuenta"))
router.get('/recuperar/:token', (res,req) => res.send("Comprobar token"))
router.post('/nuevopasword', (res,req) => res.send("Nueva contraseña"))

//rutas PRIVADAS

router.put('/usuario/actualizarPassword', (res,req)=> res.send("ACTUALZIAR CONTRASEÑA"))
router.put('/usuario/:id', (res,req)=> res.send("PERFIL DEL USUARIO"))
router.get('/usuario/:id', (res,req)=> res.send("ACTUALIZAR PERFIL"))

export default router