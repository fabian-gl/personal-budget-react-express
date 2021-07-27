const express = require('express')
const router = express.Router()
const { getTransactions, getSummaryInfo, deleteTransaction, addTransaction } = require('../controllers/transaction-controller')

router.route('/').get(getTransactions)
router.route('/summary').get(getSummaryInfo)
router.route('/').delete(deleteTransaction)
router.route('/').post(addTransaction)

module.exports = router