import { mongoose, Schema, model } from "mongoose"

const Publicicacion = new Schema({
    descripcion:{
        type: String,
        require: true
    },
    imagen:{
        public_id: String,
        secure_url:String
    },
    usuarioID:{
        type: mongoose.Schema.Types.ObjectID,
        ref: Usuario
    },
    likes:{
        type: Number
    },
    dislike:{
        type: Number
    },
    reporte:{
        type: String,
        trim: true
    }
},
{
    timestamps: true
})

export default model('Publicacion',Publicicacion)