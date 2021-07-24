const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { initDb } = require('./config/db')

dotenv.config({path: './config/config.env'})

initDb().then(() => {
    console.log('Connected to mySql!')
}).catch(err => {
    console.log(`Couldn't connect to database: ${err}`)
})


const app = express()
const transactions = require('./routes/transactions')

app.use('/api/v1/transactions', transactions)

const SERVER_PORT = process.env.SERVER_PORT || 5000

app.listen(SERVER_PORT, console.log(`Server running in ${process.env.NODE_ENV} mode at port ${SERVER_PORT}.`))
