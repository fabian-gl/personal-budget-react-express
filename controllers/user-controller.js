
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const transactionController  = require('../controllers/transaction-controller')
const { getUserModel } = require('../models/User')


// route: POST /api/v1/user/login
exports.login = async (req, res) => {

    try {
        const User = getUserModel()

        const params = {
            email: req.body.email,
            password: req.body.password
        }

        const validationResult = validateParams(params)

        if (!validationResult.valid)
        {
            res.status(400).json({ok: false, errors: validationResult.errors})
            return
        }

        const user = await User.findOne({ where: { email: req.body.email }})
    
        if (!user) res.status(401).json({ errors: ['Incorrect email or password'] })
        else {
            const authOk = await bcrypt.compare(params.password, user.password_hash)
            
            if (authOk)
            {
                jwt.sign({
                    userId: user.id,
                    userName: user.name
                }, 'qwerty321', { expiresIn: '1h' }, (err, token) => {
                    if (err) throw new Error(err)
                    res.status(200).json({token, name: user.name, message: 'Login successful' })
                  })
            }
            else res.status(401).json({ errors: ['Incorrect email or password'] })
        }
      
    } catch (error) {
        res.status(500).json({ errors: ["Couldn't log you in"] })
    }
}


// route: POST /api/v1/user/register
exports.register = async (req, res) => {
    
    try {
        const User = getUserModel()

        const params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const validationResult = validateParams(params)

        if (!validationResult.valid)
        {
            res.status(400).json({ errors: validationResult.errors })
            return
        }

        const user = await User.findOne({ where: {email: req.body.email }})
    
        if (user) res.status(400).json({ errors: ['The email is already registered'] })
        else {
            const hash = await hashPassword(req.body.password)
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password_hash: hash
            })
            
            res.status(200).json({message: 'User created, now log in please'})
        }
        
    } catch (error) {
        res.status(500).json({ errors: "Couldn't sign you in" })
    }
}


// route: DELETE /api/v1/user
exports.delete = async (req, res) => {

    try {
        const User = getUserModel()

        // First delete all transactions of the user
        await transactionController.deleteAllFromUser(req.userId)

        const userExisted = await User.destroy({ where: {id: req.userId }})

        if (userExisted) res.status(200).json({message: 'User deleted'})
        else res.status(400).json({ errors: "There was no user with such id" })
        
    } catch (error) {
        res.status(500).json({ errors: "Couldn't delete user" })
    }
}

// route: GET /api/v1/user/name
exports.getName = (req, res) => {
    res.status(200).json({ userName: req.userName })
}


// Helper functions

async function hashPassword(password)
{
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) reject(err)
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            })
        })   
    })
}


const validateParams = params => {
    
    const errors = []

    for (const key in params)
    {
        const value = params[key]

        if (!value) errors.push(`The request must have a '${key}' parameter`)

        else if (key === 'name' && String(value).length < 3)
            errors.push('The name is too short')

        else if (key === 'email' && !/\S+@\S+\.\S+/.test(value))
            errors.push('The email is not valid')

        else if (key === 'password' && String(value).length < 6)
            errors.push('The password must have at least 6 characters')
    }

    return { valid: errors.length === 0, errors }
}