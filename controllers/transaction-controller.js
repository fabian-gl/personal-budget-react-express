
const { getTransactionModel } = require('../models/Transaction')
const { getUserModel } = require('../models/User')


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
            res.status(400).json({ errors: validationResult.errors})
            return
        }
    
        transactionFound = await Transaction.findOne({where: {
            id: params.id,
            userId: req.userId
        }})
        
        if (!transactionFound) res.status(404).send({ errors: ['Transaction not found' ]})
        else {
            const {id, ...updatableParams} = params 

            for (const key in updatableParams) transactionFound[key] = updatableParams[key]
            
            await transactionFound.save()
            res.status(200).json({ message: 'Transaction updated' })
        }
    } catch (error) {
        res.status(500).json({ errors: ["Couldn't update transaction"] })
    }
}


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

        params.userId = req.userId

        await Transaction.create(params)
        res.status(200).json({ message: 'Transaction created' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: ["Couldn't add transaction"] })
    }
}


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
            userId: req.userId
        }})
        
        if (!transactionFound) res.status(404).send({ errors: ['Transaction not found'] })
        else {
            await transactionFound.destroy()
            res.status(200).json({ message: 'Transaction deleted' })
        }

    } catch (error) {
        res.status(500).json({ errors: ["Couldn't delete transaction"] })
    }
}


// route: GET /api/v1/transactions
exports.getSummaryInfo = async (req, res) => {
    
    try {
        const User = getUserModel()
        user = await User.findByPk(req.userId)
        const transactions = await user.getTransactions()

        const data = transactions.map(d => d.toJSON())
        const latestTransactions = data.slice(0, 10)
        const balance = data.reduce((acum, actual) => parseFloat(actual.amount) + acum, 0)

        await simulateServerDelay()
        res.status(200).json({ latestTransactions, balance })

    } catch (error) {
        res.status(500).json({ errors: ["Couldn't retrieve transactions"] })
    }
}


// route: GET /api/v1/transactions
exports.getAll = async (req, res) => {

    try {
        const User = getUserModel()
        user = await User.findByPk(req.userId)
        const transactions = await user.getTransactions()
        await simulateServerDelay()
        res.status(200).json({ transactions })

    } catch (error) {
        res.status(500).json({ errors: ["Couldn't retrieve transactions"] })
    }
}


const simulateServerDelay = () => {
    const DELAY_IN_MILLISECONDS = 1000
    return new Promise((resolve, reject) => {
        setTimeout(resolve, DELAY_IN_MILLISECONDS)
    })
}

const validateParams = params => {
    
    const errors = []

    for (const key in params) {
        const value = params[key]

        if (!value) errors.push(`The request must have a '${key}' parameter`)

        if (key === 'id') {    
            if (!Number.isInteger(value) || Number(value) <= 0) errors.push('The id must be a positive integer')
        
        } else if (key === 'name') {
            if (String(value).length < 2) errors.push('The name is too short')
        
        } else if (key === 'amount') {
            if (!Number(value) || isNaN(value)) errors.push(`The amount must be a valid number, different from zero, and can contain '.' for decimal place separation`)
        
        } else if (key === 'type') {
            if (Math.abs(Number(value)) !== 1) errors.push(`The type of transaction can be '1' for income and '-1' for outcome`)
        
        } else if (key === 'date') {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) errors.push('The date must have the format YYYY-MM-DD') 
        }   
    }

    const valid = errors.length === 0
    return {valid, errors}
}