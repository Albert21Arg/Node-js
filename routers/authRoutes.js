const express = require('express');
const router = express.Router();
const { 
    registrarseController, 
    loginController ,
} = require('../controllers/authController')


router.get('/registrarse', (req, res) => {
  res.render('registrarse');
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/home', (req, res) => {
  res.render('home');
});

//routes
//Registrar || Post
router.post('/registrarse', registrarseController );

//Login
router.post('/login', loginController)
module.exports = router

//enviar correo
const { sendMail } = require('../utils/emailService');
router.post('/enviarCorreo', async (req, res) => {
  const { remitente, destinatario, asunto, texto } = req.body;
  try {
    const info = await sendMail(remitente, destinatario, asunto, texto);
    res.status(200).json({ success: true, info });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
