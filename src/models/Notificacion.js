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
    usuarioID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    }
},
{
    timestamps: true
})

export default model("Notificacion", NotiSchema )