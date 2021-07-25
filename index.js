const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const { initDb } = require('./config/db')


const app = express()

dotenv.config({path: './config/config.env'})

const SERVER_PORT = process.env.SERVER_PORT || 5000

// Init database and then start listening to requests
initDb().then(() => {
    console.log('Connected to mySql!')
    app.listen(SERVER_PORT, console.log(`Server running in ${process.env.NODE_ENV} mode at port ${SERVER_PORT}.`))

}).catch(err => {
    console.log(`Couldn't connect to database: ${err}`)
})

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));


// Enable cross-origin requests from anywhere
app.use(cors())

// json body parser, to send json data in request body
app.use(express.json());

app.use('/api/v1/transactions', require('./routes/transactions'))
