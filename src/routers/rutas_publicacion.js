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
router.post('/publicar',upload.single('image'),verificarAutentication,verificarRestrin,validacionPublicacion,publicar)
router.put('/publicar/actualizar/:id',verificarAutentication,verificarRestrin,validacionPublicacion,actualizarPublicacion)
//sin restringir no necesario
router.get('/publicar/:id',verificarAutentication, publicacionUnica)
router.delete('/publicar/eliminar/:id',verificarAutentication,BorrarPublicacion)
//Reacciones
//agregar like,dislike y reporte
router.put('/publicacion/like/:id',verificarAutentication,verificarRestrin,AgregarLike)
router.put('/publicacion/dilike/:id',verificarAutentication,verificarRestrin,AgregarDislike)
router.post('/publicacion/favoritos/:id',verificarAutentication,verificarRestrin,agregarFavorito)
router.post('/publicaciones/reporte/:id',verificarAutentication,verificarRestrin, validacionReporte,reporte)

//eliminar like dislike y favorito
router.put('/publicacion/likeEliminar/:id',verificarAutentication,verificarRestrin,eliminarLike)
router.put('/publicacion/dislikeEliminar/:id',verificarAutentication,verificarRestrin,EliminarDislike)
router.delete('/publicacion/eliminarFavoritos/:id',verificarAutentication,verificarRestrin,EliminarFavorito)

//ver favoritos
router.get('/publicaciones/misFavoritos/:id',verificarAutentication,verFavoritos)

//Busqueda
router.post('/busqueda', buscar)


export default router