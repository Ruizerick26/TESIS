import {Router} from 'express'

const router = Router()


//rutas publicas
router.post('/login', (res,req)=>res.send("login"))
router.post('register', (res,req)=> res.send("Registro"))
router.get('/confirmar/:token', (res,req)=> res.send("confirmar Email"))
router.post('/recuperar', (res,req)=> res.send("Recuperar cuenta"))
router.get('/recuperar/:token', (res,req) => res.send("Comprobar token"))
router.post('/nuevopasword', (res,req) => res.send("Nueva contraseña"))

//rutas PRIVADAS

router.put('/usuario/actualizarPassword', (res,req)=> res.send("ACTUALZIAR CONTRASEÑA"))
router.put('/usuario/:id', (res,req)=> res.send("PERFIL DEL USUARIO"))
router.get('/usuario/:id', (res,req)=> res.send("ACTUALIZAR PERFIL"))
