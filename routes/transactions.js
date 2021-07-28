const express = require('express')
const router = express.Router()
const { getTransactions, getSummaryInfo, deleteTransaction, addTransaction, updateTransaction } = require('../controllers/transaction-controller')

router.route('/summary').get(getSummaryInfo)
router.route('/').get(getTransactions)
router.route('/').delete(deleteTransaction)
router.route('/').post(addTransaction)
router.route('/').put(updateTransaction)


module.exports = router