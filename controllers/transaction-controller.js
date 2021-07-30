const { getDbConnection } = require('../config/db')
const { param } = require('../routes/transactions')




// get latest transactions and balance
// route: GET base_url/api/v1/transactions
exports.updateTransaction = (req, res, next) => {

    const possibleParams = {
        id: req.body.id,
        name: req.body.name,
        amount: req.body.amount,
        type: req.body.type,
        date: req.body.date
    }

    const query = prepareUpdateQuery(possibleParams)

    // res.status(200).json({result: 'result', possibleParams, query})
    // return
    queryPromise(query)
    .then(result => {
        res.status(200).json({result: result})
    })
    .catch(err => {
        res.status(500).json({message: `Couldn't delete transaction: ${err}`})
    })

}

const prepareUpdateQuery = (params) => {

    const {id, ...updatableParams} = params 
    let setClause = ''

    for (const key in updatableParams){
        if (updatableParams[key]) 
            setClause += `${(setClause === '' ? '' : ', ')}${key} = '${updatableParams[key]}'`
    }

    return `UPDATE transactions SET ${setClause} WHERE id = ${id}`
}



// get latest transactions and balance
// route: GET base_url/api/v1/transactions
exports.addTransaction = (req, res, next) => {

    const possibleParams = {
        name: req.body.name,
        amount: req.body.amount,
        type: req.body.type,
        date: req.body.date
    }

    const validationResult = validateParams(possibleParams)

    if (!validationResult.valid)
    {
        res.status(400).json({ok: false, errors: validationResult.errors})
        return
    }

    const query = `INSERT INTO transactions (name, amount, type, date) VALUES ('${possibleParams.name}', '${possibleParams.amount}', '${possibleParams.type}', '${possibleParams.date}')`

    // res.status(200).json({result: 'result', possibleParams, query})
    // return

    queryPromise(query)
    .then(result => {
        res.status(200).json({result: result})
    })
    .catch(err => {
        res.status(500).json({message: `Couldn't insert transaction: ${err}`})
    })
}

const validateParams = params => {
    
    const errors = []
    console.log(params)
    Object.keys(params).forEach(key => {
        const value = params[key]

        if (key === 'name')
            if (String(value).length < 2) 
                errors.push('The name is too short')
        
        if (key === 'amount')
            if (!Number(value) || isNaN(value)) 
                errors.push(`The amount must be a valid number, different from zero, and can contain '.' for decimal place separation`)

        if (key === 'type')
            if (Math.abs(Number(value)) !== 1) 
                errors.push(`The type of transaction can be '1' for income and '-1' for outcome`)

        if (key === 'date')
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
                errors.push('The date must have the format YYYY-MM-DD') 
    })

    const valid = errors.length === 0
    return {valid, errors}
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