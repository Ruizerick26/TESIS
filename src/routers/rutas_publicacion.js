import { Router } from "express";
import {
    publicacionesGlobales,
    publicar,
    actualizarPublicacion,
    publicacionUnica,
    BorrarPublicacion
} from '../controllers/publicaciones_controler.js'
import verificarAutentication from "../middlewares/autentication.js"
import upload from '../middlewares/multer.js'


const router = Router()

//Rutas publicas
router.get('/publicaciones',publicacionesGlobales)


//rutas privadas
router.post('/publicar',upload.single('image'),verificarAutentication,publicar)
router.put('/publicar/:id',verificarAutentication,actualizarPublicacion)
router.get('/publicar/:id',verificarAutentication, publicacionUnica)
router.delete('/publicar/eliminar',verificarAutentication,BorrarPublicacion)

export default router