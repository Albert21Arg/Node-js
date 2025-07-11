const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

require('dotenv').config();


const registrarseController = async (req, res) => {
    try {
        const { userName, email, password, restaurar } = req.body
        if (!userName || !email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Por favor complete los campos'
            })
        }

        //verificar el usuario
        const existe = await userModel.findOne({ email })
        if (existe) {
            return res.status(500).send({
                success: false,
                message: 'El Correo ya existe'
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            restaurar,
        })
        return res.redirect('/api/v1/auth/login');

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error al registrarse'
        })
    }
};

//Login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Error en correo o contraseña'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Usuario no existe'
            })
        }
        //Comparar la contraseña encrytada
        const isMacth = await bcrypt.compare(password, user.password)
        if (!isMacth) {
            return res.status(500).send({
                success: false,
                message: "Contraseña incorrecta"
            })
        }
        // token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })
        user.password = undefined;
        res.render('home', { userName: 'Albert' });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error al iniciar sesión'
        })
    }
};




module.exports = {
    registrarseController,
    loginController,
    
}