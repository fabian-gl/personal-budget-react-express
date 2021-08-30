const express = require('express')
const router = express.Router()

const { userLogin, userRegistration, userLogout } = require('../controllers/user-controller')

router.route('/register').post(userRegistration)
router.route('/login').post(userLogin)
router.route('/logout').post(userLogout)

module.exports = router