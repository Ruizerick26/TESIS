import { mongoose, Schema, model } from "mongoose"

const Reporte = new Schema ({
    idPublicacion:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Publicacion'
    },
    usuarioId:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Usuario'
    },
    motivo:{
        type: String,
        trim: true,
    },
    detalle:{
        type: String,
        trim: true,
    },
    estado:{
        type: String,
        default: "No resuelto"
    },
    reportante:{
        type: String
    }
},
{
    timestamps: true
})

export default model("Reporte",Reporte)