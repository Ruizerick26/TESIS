import { Router } from "express";

const router = Router()

//rutas privadas
router.post('/publicar',(res,req)=> res.send('publicar imagen'))
router.put('/publicar/:id',(res,req)=> res.send('actualizar descripcion publicacion'))
router.get('/publicar/:id',(res,req)=> res.send('ver publicacion'))
router.get('/publicaciones', (res,req)=> res.send('Listar publicaciones'))
router.delete('/publicar/eliminar',(res,req)=> res.send('eliminar publicacion'))

export default router