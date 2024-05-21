import { Router } from "express";
import {
    publicacionesGlobales,
    publicar,
    actualizarPublicacion,
    publicacionUnica,
    BorrarPublicacion,
    AgregarLike,
    AgregarDislike,
    agregarFavorito,
    eliminarLike,
    EliminarDislike,
    EliminarFavorito,
    reporte,
    verFavoritos
} from '../controllers/publicaciones_controler.js'
import verificarAutentication from "../middlewares/autentication.js"
import upload from '../middlewares/multer.js'


const router = Router()

//Rutas publicas
router.get('/publicaciones',publicacionesGlobales)


//rutas privadas
router.post('/publicar',upload.single('image'),verificarAutentication,publicar)
router.put('/publicar/actualizar/:id',verificarAutentication,actualizarPublicacion)
router.get('/publicar/:id',verificarAutentication, publicacionUnica)
router.delete('/publicar/eliminar',verificarAutentication,BorrarPublicacion)
//Reacciones
router.put('/publicacion/like/:id',verificarAutentication,AgregarLike)
router.put('/publicacion/dilike/:id',verificarAutentication,AgregarDislike)
router.put('/publicacion/favoritos/:id',verificarAutentication,agregarFavorito)
router.put('/publicacion/likeEliminar/:id',verificarAutentication,eliminarLike)
router.put('/publicacion/dislikeEliminar/:id',verificarAutentication,EliminarDislike)
router.delete('/publicacion/eliminarFavoritos/:id',verificarAutentication,EliminarFavorito)
router.get('/publicaciones/misFavoritos/:id',verificarAutentication,verFavoritos)


export default router