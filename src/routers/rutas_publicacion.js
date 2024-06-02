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
import {validacionPublicacion, validacionReporte} from '../middlewares/validacionFormularios.js'
import {verificarRestrin} from '../middlewares/bloqueosUsuarios.js'


const router = Router()

//Rutas publicas
router.get('/publicaciones',publicacionesGlobales)


//rutas privadas
//ya restringido
router.post('/publicar',verificarRestrin,upload.single('image'),verificarAutentication,validacionPublicacion,publicar)
router.put('/publicar/actualizar/:id',verificarRestrin,verificarAutentication,validacionPublicacion,actualizarPublicacion)
//sin restringir no necesario
router.get('/publicar/:id',verificarAutentication, publicacionUnica)
router.delete('/publicar/eliminar/:id',verificarAutentication,BorrarPublicacion)
//Reacciones
//agregar like,dislike y reporte
router.put('/publicacion/like/:id',verificarRestrin,verificarAutentication,AgregarLike)
router.put('/publicacion/dilike/:id',verificarRestrin,verificarAutentication,AgregarDislike)
router.post('/publicacion/favoritos/:id',verificarRestrin,verificarAutentication,agregarFavorito)
router.post('/publicaciones/reporte/:id',verificarRestrin,verificarAutentication, validacionReporte,reporte)

//eliminar like dislike y favorito
router.put('/publicacion/likeEliminar/:id',verificarRestrin,verificarAutentication,eliminarLike)
router.put('/publicacion/dislikeEliminar/:id',verificarRestrin,verificarAutentication,EliminarDislike)
router.delete('/publicacion/eliminarFavoritos/:id',verificarRestrin,verificarAutentication,EliminarFavorito)

//ver favoritos
router.get('/publicaciones/misFavoritos/:id',verificarAutentication,verFavoritos)

//Busqueda
router.get('/busqueda', buscar)


export default router