var bcrypt = require('bcryptjs');

const { getUserModel } = require('../models/User')



exports.userLogin = async (req, res) => {

    try {
        const User = getUserModel()

        const params = {
            email: req.body.email,
            password: req.body.password,
        }

        const validationResult = validateParams(params)

        if (!validationResult.valid)
        {
            res.status(400).json({ok: false, errors: validationResult.errors})
            return
        }

        const user = await User.findOne({ where: {email: req.body.email}})
    
        if (!user) res.status(401).json({ok: false, errors: ['Incorrect email or password']})
        else
        {
            const authOk = await bcrypt.compare(params.password, user.password_hash)
            
            if (authOk)
            {
                // Deal with tokens
                res.status(200).json({message: 'Login successful'})
            }
            else res.status(401).json({ok: false, errors: ['Incorrect email or password']})

        }
      
    } catch (error) {
        res.status(500).json({error: `Couldn't log you in ${error}`})
    }}

exports.userRegistration = async (req, res) => {
    
    try {
        const User = getUserModel()

        const params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        const validationResult = validateParams(params)

        if (!validationResult.valid)
        {
            res.status(400).json({ok: false, errors: validationResult.errors})
            return
        }

        const user = await User.findOne({ where: {email: req.body.email}})
    
        if (user) res.status(400).json({ok: false, errors: ['The email is already registered']})
        else
        {
            const hash = await hashPassword(req.body.password)
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password_hash: hash
            })
            
            res.status(200).json({message: 'User created, now log in please'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: `Couldn't sign you in ${error}`})
    }
}

exports.userLogout = (req, res) => {
    // res.send('logout')
    res.status(200).json(req.body)
}


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




// const simulateServerDelay = () => {
//     const DELAY_IN_MILLISECONDS = 1000
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, DELAY_IN_MILLISECONDS)
//     })
// }

const validateParams = params => {
    
    const errors = []

    for (const key in params)
    {
        const value = params[key]

        if (!value) errors.push(`The request must have a '${key}' parameter`)

        if (key === 'name' && String(value).length < 3)
            errors.push('The name is too short')

        else if (key === 'email' && !/\S+@\S+\.\S+/.test(value))
            errors.push('The email is not valid')

        else if (key === 'password' && String(value).length < 6)
            errors.push('The password must have at least 6 characters')
    }

    return {valid: errors.length === 0, errors}
}