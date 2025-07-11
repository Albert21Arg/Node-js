const colors = require('colors')
const mongoose = require('mongoose')

//conexion db mongoose
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conexion a DB Exitosa ')
    }catch (error){
        console.log("DB Error", error)
    }
}

module.exports = connectDB
