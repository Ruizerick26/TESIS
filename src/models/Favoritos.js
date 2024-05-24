import { mongoose, Schema, model } from "mongoose"

const FavoritoSchema = new Schema ({
    idUsuario:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Usuario'
    },
    idPublicacion:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Publicacion'
    }
},
{
    timestamps: true
})

export default model("Favorito",FavoritoSchema)