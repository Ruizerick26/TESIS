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
    verFavoritos,
    buscar
} from '../controllers/publicaciones_controler.js'
import verificarAutentication from "../middlewares/autentication.js"
import upload from '../middlewares/multer.js'
import {validacionPublicacion} from '../middlewares/validacionFormularios.js'


const router = Router()

//Rutas publicas
router.get('/publicaciones',publicacionesGlobales)


//rutas privadas
router.post('/publicar',upload.single('image'),verificarAutentication,validacionPublicacion,publicar)
router.put('/publicar/actualizar/:id',verificarAutentication,validacionPublicacion,actualizarPublicacion)
router.get('/publicar/:id',verificarAutentication, publicacionUnica)
router.delete('/publicar/eliminar/:id',verificarAutentication,BorrarPublicacion)
//Reacciones
//agregar like,dislike y reporte
router.put('/publicacion/like/:id',verificarAutentication,AgregarLike)
router.put('/publicacion/dilike/:id',verificarAutentication,AgregarDislike)
router.post('/publicacion/favoritos/:id',verificarAutentication,agregarFavorito)
router.post('/publicaciones/reporte/:id',verificarAutentication,reporte)

//eliminar like dislike y favorito
router.put('/publicacion/likeEliminar/:id',verificarAutentication,eliminarLike)
router.put('/publicacion/dislikeEliminar/:id',verificarAutentication,EliminarDislike)
router.delete('/publicacion/eliminarFavoritos/:id',verificarAutentication,EliminarFavorito)

//ver favoritos
router.get('/publicaciones/misFavoritos/:id',verificarAutentication,verFavoritos)

//Busqueda
router.get('/busqueda', buscar)


export default router