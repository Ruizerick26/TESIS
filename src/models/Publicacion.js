import { mongoose, Schema, model } from "mongoose"

const Publicicacion = new Schema({
    descripcion:{
        type: String,
        maxlength: 150,
        require: true,
        trim: true
    },
    usuarioID:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Usuario'
    },
    likes:{
        type: Number,
        default: 0
    },
    dislike:{
        type: Number,
        default: 0
    },
    estilo:{
        estiloG: String,
        temporada: String,
        epoca: String,
        genero: String
    },
    imagen:{
        public_id: String,
        secure_url:String
    },
    nombre:{
        type: String,
        trim: true
    }

},
{
    timestamps: true
})

export default model('Publicacion',Publicicacion)