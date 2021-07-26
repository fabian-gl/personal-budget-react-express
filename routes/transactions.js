const express = require('express')
const router = express.Router()
const { getTransactions, getSummaryInfo } = require('../controllers/transaction-controller')

router.route('/').get(getTransactions)
router.route('/summary').get(getSummaryInfo)

module.exports = router