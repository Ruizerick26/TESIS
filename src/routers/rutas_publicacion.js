import { Router } from "express";
import {
    publicacionesGlobales,
    publicar,
    actualizarPublicacion,
    publicacionUnica,
    BorrarPublicacion
} from '../controllers/publicaciones_controler.js'
import verificarAutentication from "../middlewares/autentication.js"


const router = Router()

//Rutas publicas
router.get('/publicaciones',publicacionesGlobales)


//rutas privadas
router.post('/publicar',verificarAutentication,publicar)
router.put('/publicar/:id',verificarAutentication,actualizarPublicacion)
router.get('/publicar/:id',verificarAutentication, publicacionUnica)
router.delete('/publicar/eliminar',verificarAutentication,BorrarPublicacion)

export default router