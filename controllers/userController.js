const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');

//informacion del usuario
const getUserController = async (req,res) => {
    try{
        const user = await userModel.findById({_id:req.user.id},)
        if (!user){
            return res.status(404).send({
                success:false,
                message: 'Usuario no encontrado'
            })
        }
        user.password = undefined
        res.status(200).send({
            success:true,
            message: 'Usuario Correcto',
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error al obtener datos de usuario',
            error
        })
    }
};

//Actulizar
const updateUserController = async (req, res) =>{
    try{
        const user = await userModel.findById(req.user.id);
        if (!user){
            return res.status(404).send({
                success:false,
                message:'Usuari no encontredo'
            })
        }
        const {userName,email,password} = req.body
        if (userName) user.userName = userName
        if (email) user.email = email
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save()
        res.status(200).send({
            success:true,
            message:'Actulizado correctamente'
        })
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error al actulizar usuario',
            error
        })
    }
    
}

const updatePasswordController = async (req,res) =>{
    try{
        const user = await userModel.findById(req.user.id)
        if (!user){
            return res.status(404).send({
                success:false,
                message:'usuario no encontrado'
            })
        }
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:'Ingrese una contraseña'
            })
        }
        const isMacth = await bcrypt.compare(oldPassword, user.password)
        if (!isMacth){
            return res.status(500).send({
                success: false,
                message: "Contraseña incorrecta"
            })
        }
        user.password = newPassword
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message: 'Se a Cambiado la contraseña'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error al actualizar la contraseña',
            error
        })
    }
}


const resetPasswordController = async (req,res) =>{
    try{
        const {email,newPassword, restaurar} = req.body
        if(!email || !newPassword || !restaurar){
            return res.status(500).send({
                success:false,
                message:'Error al cargar el archivo.'
        })
    }
    const user = await userModel.findOne({email,restaurar})
    if(!user){
        return res.status(500).send({
            success:false,
            message: 'usuario o respuesta incorrecta'
        })
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword
    await user.save()
    res.status(200).send({
        success:true,
        message: 'Restaurada con exito'
    })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error al restaurar contraseña'
        })
    }
}



module.exports = {
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePasswordController,
} 