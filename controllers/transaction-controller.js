const { getDbConnection } = require('../config/db')


// get all transactions
// route: GET base_url/api/v1/transactions
exports.getTransactions = (req, res, next) => {
    const dbConnection = getDbConnection()

    dbConnection.query('select * from transactions', (err, result) => {
        if (err)
            res.status(500).json({message: `Couldn't retrieve transaction: ${err}`})
        else {
            res.status(200).json({data: result})
        }

    })
}