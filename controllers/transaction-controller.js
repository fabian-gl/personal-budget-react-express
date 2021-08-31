const { getTransactionModel } = require('../models/Transaction')


// Update a transaction
// route: PUT /api/v1/transactions
exports.update = async (req, res) => {

    try {
        const Transaction = getTransactionModel()

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
    
        transactionFound = await Transaction.findOne({where: {
            id: params.id,
            user_id: req.userId
        }})
        
        if (transactionFound === null) res.status(404).send({error: 'Transaction not found'})
        else
        {
            const {id, ...updatableParams} = params 

            for (const key in updatableParams) transactionFound[key] = updatableParams[key]
            
            await transactionFound.save()
            res.status(200).json({message: 'Transaction updated'})
        }
    } catch (error) {
        res.status(500).json({error: `Couldn't update transaction: ${error}`})
    }
}


// Add a new transaction
// route: POST /api/v1/transactions
exports.add = async (req, res) => {

    try {
        const Transaction = getTransactionModel()

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

        params.user_id = req.userId
        await Transaction.create(params)
        res.status(200).json({message: 'Transaction created'})
    } catch (error) {
        res.status(500).json({error: `Couldn't add transaction: ${error}`})
    }
}


// delete the transaction corresponding to the id sent
// route: DELETE /api/v1/transactions
exports.delete = async (req, res) => {

    try {
        const Transaction = getTransactionModel()

        const params = {
            id: req.body.id || null
        }

        const validationResult = validateParams(params)

        if (!validationResult.valid)
        {
            res.status(400).json({ok: false, errors: validationResult.errors})
            return
        }

        transactionFound = await Transaction.findOne({where: {
            id: params.id,
            user_id: req.userId
        }})
        if (transactionFound === null) res.status(404).send({error: 'Transaction not found'})
        else
        {
            await transactionFound.destroy()
            res.status(200).json({result: 'Transaction deleted'})
        }

    } catch (error) {
        res.status(500).json({error: `Couldn't delete transaction: ${error}`})
    }
}


// get latest transactions and balance
// route: GET /api/v1/transactions
exports.getSummaryInfo = async (req, res) => {

    try {
        const transactions = await getAllTransactions(req.userId)

        const data = transactions.map(d => d.toJSON())
        const latestTransactions = data.slice(0, 10)
        const balance = data.reduce((acum, actual) => parseFloat(actual.amount) + acum, 0)

        res.status(200).json({latestTransactions, balance})
    } catch (error) {
        res.status(500).json({error: `Couldn't retrieve transactions: ${error}`})
    }
}


// get all transactions
// route: GET /api/v1/transactions
exports.getAll = async (req, res) => {

    try {
        const transactions = await getAllTransactions(req.userId)
        res.status(200).json({transactions})

    } catch (error) {
        res.status(500).json({error: `Couldn't retrieve transactions: ${error}`})
    }
}

const getAllTransactions = async (userId) => {
    const Transaction = getTransactionModel()

    const transactions = await Transaction.findAll({
        where: {
            user_id: userId
        },
        order: [
            ['date', 'desc'],
            ['createdAt', 'desc']
        ]
    })

    await simulateServerDelay()
    return transactions
}

const simulateServerDelay = () => {
    const DELAY_IN_MILLISECONDS = 1000
    return new Promise((resolve, reject) => {
        setTimeout(resolve, DELAY_IN_MILLISECONDS)
    })
}

const validateParams = params => {
    
    const errors = []

    Object.keys(params).forEach(key => {
        const value = params[key]

        if (!value) errors.push(`The request must have a '${key}' parameter`)

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