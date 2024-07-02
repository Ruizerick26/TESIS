import mongoose, { Schema, model } from "mongoose"

const NotiSchema = new Schema({
    tipo: {
        type: String,
        trim:true
    },
    mensaje:{
        type: String,
        trim: true
    },
    nombreE:{
        type: String
    },
    urlPu:{
        type: String
    },
    publiID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Publicacion' 
    },
    usuarioID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    perfil:{
        type: String
    }
},
{
    timestamps: true
})

export default model("NotificacionU", NotiSchema )