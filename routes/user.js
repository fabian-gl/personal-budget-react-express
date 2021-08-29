const express = require('express')
const router = express.Router()

const { userLogin, userRegistration } = require('../controllers/user-controller')

router.route('/login').get(userLogin)
router.route('/register').get(userRegistration)

module.exports = router