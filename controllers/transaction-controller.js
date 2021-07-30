const { getDbConnection } = require('../config/db')


// Update a transaction
// route: PUT /api/v1/transactions
exports.updateTransaction = (req, res, next) => {

    const params = {
        id: req.body.id || null
    }

    const possibleParams = ['name', 'amount', 'type', 'date']

    for (const key of possibleParams) if (req.body[key]) params[key] = req.body[key]

    const validationResult = validateParams(params)

    if (!validationResult.valid)
    {
        res.status(400).json({ok: false, errors: validationResult.errors})
        return
    }

    const query = prepareUpdateQuery(params)

    queryPromise(query)
    .then(result => {
        res.status(200).json({result: result})
    })
    .catch(err => {
        res.status(500).json({error: `Couldn't update transaction: ${err}`})
    })

}

const prepareUpdateQuery = (params) => {

    const {id, ...updatableParams} = params 
    let setClause = ''

    for (const key in updatableParams)
        setClause += `${(setClause === '' ? '' : ', ')}${key} = '${updatableParams[key]}'`

    return `UPDATE transactions SET ${setClause} WHERE id = ${id}`
}



// Add a new transaction
// route: POST /api/v1/transactions
exports.addTransaction = (req, res, next) => {

    const params = {
        name: req.body.name,
        amount: req.body.amount,
        type: req.body.type,
        date: req.body.date
    }

    const validationResult = validateParams(params)

    if (!validationResult.valid)
    {
        res.status(400).json({ok: false, errors: validationResult.errors})
        return
    }

    const query = `INSERT INTO transactions (name, amount, type, date) VALUES ('${params.name}', '${params.amount}', '${params.type}', '${params.date}')`

    queryPromise(query)
    .then(result => {
        res.status(200).json({result: result})
    })
    .catch(err => {
        res.status(500).json({error: `Couldn't insert transaction: ${err}`})
    })
}

const validateParams = params => {
    
    const errors = []

    Object.keys(params).forEach(key => {
        const value = params[key]

        if (!value) errors.push(`The transaction must have a '${key}' parameter`)

        if (key === 'id')
            if (!Number.isInteger(value) || Number(value) <= 0) errors.push('The id must be a positive integer')
        
        if (key === 'name')
            if (String(value).length < 2) errors.push('The name is too short')
        
        if (key === 'amount')
            if (!Number(value) || isNaN(value)) errors.push(`The amount must be a valid number, different from zero, and can contain '.' for decimal place separation`)
        
        if (key === 'type')
            if (Math.abs(Number(value)) !== 1) errors.push(`The type of transaction can be '1' for income and '-1' for outcome`)
        
        if (key === 'date')
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) errors.push('The date must have the format YYYY-MM-DD') 
        
    })

    const valid = errors.length === 0
    return {valid, errors}
}


// delete the transaction corresponding to the id sent
// route: DELETE /api/v1/transactions
exports.deleteTransaction =  (req, res, next) => {

    const params = {
        id: req.body.id || null
    }

    const validationResult = validateParams(params)

    if (!validationResult.valid)
    {
        res.status(400).json({ok: false, errors: validationResult.errors})
        return
    }

    queryPromise(`DELETE FROM transactions WHERE id=${params.id}`)
    .then(result => {
        res.status(200).json({result: result})
    })
    .catch(err => {
        res.status(500).json({error: `Couldn't delete transaction: ${err}`})
    })
}


// get latest transactions and balance
// route: GET /api/v1/transactions
exports.getSummaryInfo = (req, res, next) => {

    const latestTransactions = queryPromise('SELECT * FROM transactions ORDER BY id DESC LIMIT 10')
    const balance = queryPromise('SELECT SUM(amount) FROM transactions')

    Promise.all([latestTransactions, balance]).then(([latestTransactionsResult, balanceResult]) => {  
        const extractedBalance = getValueFromSqlResultObject(balanceResult) || 0
        // timeout included to simulate server delays
        setTimeout(() => {
            res.status(200).json({latestTransactions: latestTransactionsResult, balance: extractedBalance})
        }, 1000)
    })
    .catch(err => {
        res.status(500).json({error: `Couldn't retrieve transaction: ${err}`})
    })

}

const getValueFromSqlResultObject = result => Object.values(result[0])[0]


// get all transactions
// route: GET /api/v1/transactions
exports.getTransactions = (req, res, next) => {

    queryPromise('SELECT * FROM transactions ORDER BY id DESC')
    .then(result => {
        // timeout included to simulate server delays
        setTimeout(() => {
            res.status(200).json({transactions: result})
        }, 1000)
    })
    .catch(err => {
        res.status(500).json({error: `Couldn't retrieve transactions: ${err}`})
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