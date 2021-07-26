const { getDbConnection } = require('../config/db')



// get latest transactions and balance
// route: GET base_url/api/v1/transactions
exports.getSummaryInfo = (req, res, next) => {

    const latestTransactions = queryPromise('SELECT * FROM transactions LIMIT 10')
    const balance = queryPromise('SELECT SUM(amount) FROM transactions')

    Promise.all([latestTransactions, balance]).then(([latestTransactionsResult, balanceResult]) => {  
        const extractedBalance = getValueFromSqlResultObject(balanceResult) || 0
        setTimeout(() => {
            res.status(200).json({latestTransactions: latestTransactionsResult, balance: extractedBalance})
        }, 1000)
    })
    .catch(err => {
        res.status(500).json({message: `Couldn't retrieve transaction: ${err}`})
    })

}

const getValueFromSqlResultObject = result => Object.values(result[0])[0]


// get all transactions
// route: GET base_url/api/v1/transactions
exports.getTransactions = (req, res, next) => {

    queryPromise('select * from transactions')
    .then(result => {
        setTimeout(() => {
            res.status(200).json({transactions: result})
        }, 1000)
    })
    .catch(err => {
        res.status(500).json({message: `Couldn't retrieve transaction: ${err}`})
    })

}


const queryPromise = (sqlQuery) => {

    return new Promise ((resolve, reject) => {
        const dbConnection = getDbConnection()

        dbConnection.query(sqlQuery, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}