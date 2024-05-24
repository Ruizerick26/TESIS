import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const moderadorSchema = new Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    apellido:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    codigo:{
        type: String,
        trim: true
    },
    token:{
        type: String,
        default: null
    },
    super:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

//encriptar password

moderadorSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

//comparar el password con la base
moderadorSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}
//encriptar codigo

moderadorSchema.methods.encrypCode = async function(codigo){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(codigo,salt)
    return passwordEncryp
}

//comparar el codigo con la base
moderadorSchema.methods.matchCode = async function(codigo){
    const response = await bcrypt.compare(codigo,this.codigo)
    return response
}

//crear token
moderadorSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2) 
    return tokenGenerado  
}


export default model('Moderador',moderadorSchema)