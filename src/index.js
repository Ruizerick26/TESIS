import connection from "./database.js"
import app from "./server.js"

connection()

app.listen(app.get('port'),()=>{
    console.log(`Servidor funcional en http://localhost:${app.get('port')}`)
})
