import mongoose, { Schema, model } from "mongoose"

const NotiSchema = new Schema({
    mensaje:{
        type: String,
        trim: true
    },
    Reportado:{
        type: String,
        ref: "usuario"
    },
    Reportante:{
        type: String,
        fer: "usuario"
    }

},
{
    timestamps: true
})

export default model("NotificacionM", NotiSchema )