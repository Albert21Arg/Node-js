const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMail = (remitente, destinatario, asunto, texto) => {
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER_CORREO,
            pass: process.env.CODE_PASSWORD
        }
    });

    const mailOptions = {
        from: remitente,
        to: destinatario,
        subject: asunto,
        text: texto
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log("Correo enviado a: " + destinatario);
                resolve(info);
            }
        });
    });
};