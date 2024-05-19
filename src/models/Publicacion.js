import { mongoose, Schema, model } from "mongoose"

const Publicicacion = new Schema({
    descripcion:{
        type: String,
        require: true
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
    }
},
{
    timestamps: true
})

export default model('Publicacion',Publicicacion)