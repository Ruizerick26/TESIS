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
    },
    fotoperfil:{
        public_id: String,
        secure_url: String
    },
    descripcion:{
        type: String,
        maxlength: 150,
        default: "Describe tu perfil"
    },
    fechaCodigo:{
        type: Date
    },
    tiempoR:{
        type: Date,
        default: null
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
//encriptar token

usuarioSchema.methods.encrypToken = async function(token){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(token,salt)
    return passwordEncryp
}

//comparar el token con la base
usuarioSchema.methods.matchToken = async function(token){
    const response = await bcrypt.compare(token,this.token)
    return response
}

//crear token
usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2) 
    return tokenGenerado  
}

export default model('usuario', usuarioSchema)