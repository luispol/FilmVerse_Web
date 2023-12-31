//Importacion de la libreria para mongoose y bcryot para encriptar la contraseña
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//Definiion de la coleccion de usuarios
const usuarioSchema= mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    tipo:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

//Verificamos que antes de guardar el pwd del usuario lo encript
usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

//Comprobamos el  password
usuarioSchema.methods.comprobarPassword = async function(passwordForm){
    return await  bcrypt.compare(passwordForm,this.password)
}

//Nombramos la coleccion
const Usuario = mongoose.model("Usuario",usuarioSchema)

export default Usuario