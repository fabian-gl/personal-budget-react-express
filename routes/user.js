const express = require('express')
const router = express.Router()

const auth = require('../auth/auth')

const userController = require('../controllers/user-controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/name', auth, userController.getName)

module.exports = router