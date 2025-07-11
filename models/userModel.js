const mongoose = require('mongoose')

//shema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:[true, 'Nombre de usuario obligatorio']
    },
    email:{
        type:String,
        require:[true, 'El Correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        require:[true, 'la contraseña es obligatoria']
    },
    restaurar:{
        type:String,
    }
},{timestamps:true})

module.exports = mongoose.model('User', userSchema)