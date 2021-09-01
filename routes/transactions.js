const express = require('express')

const router = express.Router()
const auth = require('./auth/auth')

const transactionController  = require('../controllers/transaction-controller')

router.get('/summary', auth, transactionController.getSummaryInfo)
router.get('/', auth, transactionController.getAll)
router.delete('/', auth, transactionController.delete)
router.post('/', auth, transactionController.add)
router.put('/', auth, transactionController.update)


module.exports = router