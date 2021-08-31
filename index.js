const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const { initDb } = require('./config/db')


dotenv.config({path: './config/config.env'})

const app = express()

// Enable cross-origin requests from any domain
app.use(cors({methods: 'OPTIONS, GET, POST, PUT, DELETE'}))

// json body parser, to send json data in request body
app.use(express.json())

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
else if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const SERVER_PORT = process.env.SERVER_PORT || 5000

// Init database and then start listening to requests
initDb().then(() => {
    console.log('Connected to mySql!')
    app.listen(SERVER_PORT, console.log(`Server running in ${process.env.NODE_ENV} mode at port ${SERVER_PORT}.`))
}).catch(err => {
    console.log(`Couldn't connect to database: ${err}`)
})


app.use('/api/v1/user', require('./routes/user'))
app.use('/api/v1/transactions', require('./routes/transactions'))
