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
router.post('/publicar',publicar)
router.put('/publicar/:id',actualizarPublicacion)
router.get('/publicar/:id', publicacionUnica)
router.delete('/publicar/eliminar',BorrarPublicacion)

export default router