import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required : true,
        trim: true
    },
    email:{
        type: String,
        required : true,
        trim: true
    },
    fechaNacimiento:{
        type: Date,
        required: true,
        trim: true,
        default: Date.now()
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    token:{
        type: String,
        default: null
    },
    confirmar:{
        type: Boolean,
        default: false
    },
    bloqueo:{
        type: Boolean,
        default: false
    },
    restriccion:{
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})

//encriptar password

usuarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

//comparar el password con la base
usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

//crear token
usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2) 
    return tokenGenerado  
}

export default model('usuario', usuarioSchema)