import { mongoose, Schema, model } from "mongoose"

const FavoritoSchema = new Schema ({
    idUsuario:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Usuario'
    },
    idPublicacion:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Publicacion'
    },
    imagen:{
        public_id: String,
        secure_url:String
    },
    descripcion:{
        type: String,
        maxlength: 150,
        require: true,
        trim: true
    },
    estilo:{
        estiloG: String,
        temporada: String,
        epoca: String,
        genero: String
    }
},
{
    timestamps: true
})

export default model("Favorito",FavoritoSchema)