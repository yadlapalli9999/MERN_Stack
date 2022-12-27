const express = require('express');
const { loginController, registerController } = require('../controllers/userCtrl');

//router object
const router = express.Router()

//routers

//login router || POST
router.post('/login', loginController)

//Register || POST
router.post('/register',registerController)


module.exports = router;