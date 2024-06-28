import connection from "./database.js"
import app from "./server.js"
try{
connection()

app.listen(app.get('port'),()=>{
    console.log(`Servidor funcional en http://localhost:${app.get('port')}`)
})
}catch(error){
    console.log(error)
}
