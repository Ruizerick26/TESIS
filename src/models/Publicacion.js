import { mongoose, Schema, model } from "mongoose"

const Publicicacion = new Schema({
    descripcion:{
        type: String,
        require: true
    },
    imagen:{
        public_id: String,
        secure_url:Sring
    },
    usuarioID:{
        type: mongoose.Schema.Types.ObjectID,
        ref: Usuario
    }
},
{
    timestamps: true
})

export default model('Publicacion',Publicicacion)