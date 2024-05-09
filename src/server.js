import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import routerUsuario from './routers/rutas_Usuario.js'
import routerPublicacion from './routers/rutas_publicacion.js'
import routerModerador from './routers/rutas_moderador.js'

//Inicializaciones
dotenv.config()
const app = express()

//configuracion
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
app.set('port',process.env.port || 3000)


//Middlwares
app.use(express.json())

//Rutas
app.use('/api',routerUsuario)
app.use('/api', routerPublicacion)
app.use('/api',routerModerador)

//CONTROL DE ERROR
app.use((req,res) => res.status(404).send("Endpoint no encontrado - 404"))

export default app