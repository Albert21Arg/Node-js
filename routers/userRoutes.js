const express = require('express');
const { getUserController,
     updateUserController,
     resetPasswordController,
     updatePasswordController

 } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//Get user || get
router.get('/getUser', authMiddleware ,getUserController)

//actualizar usuario
router.put('/updateUser', authMiddleware ,updateUserController)

//
router.post("/updatePassword", authMiddleware, updatePasswordController)

//restaurar contraseña
router.post("/resetPassword", authMiddleware, resetPasswordController)


module.exports = router
