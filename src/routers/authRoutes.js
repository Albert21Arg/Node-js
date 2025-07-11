const express = require('express');
const router = express.Router();
const { 
    registrarseController, 
    loginController 
} = require('../../controllers/authController')


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