const { getDbConnection } = require('../config/db')


// get latest transactions and balance
// route: GET base_url/api/v1/transactions
exports.addTransaction = (req, res, next) => {
    console.log('check params')
    console.log(req.body)
    const id = 213//req.body.id
    // console.log('got here')
    // // console.log(req)
    // // const latestTransactions = queryPromise('SELECT * FROM transactions LIMIT 10')
    res.status(200).json({ok: true, id})
    // .catch(err => {
    //     res.status(500).json({message: `Couldn't retrieve transaction: ${err}`})
    // })

}

// delete the transaction corresponding to the id sent
// route: DELETE base_url/api/v1/transactions
exports.deleteTransaction =  (req, res, next) => {

    const idToDelete = parseInt(req.body.id)

    queryPromise(`DELETE FROM transactions WHERE id=${idToDelete}`)
    .then(result => {
        res.status(200).json({result: result})
    })
    .catch(err => {
        res.status(500).json({message: `Couldn't delete transaction: ${err}`})
    })
    
}


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

    queryPromise('SELECT * FROM transactions')
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