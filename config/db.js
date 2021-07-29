const mysql = require('mysql')

let dbConnection = null

const initDb = () => {
    return new Promise ((resolve, reject) => {
        if (dbConnection)
        {
            console.log('Database already connected')
            resolve()
        }
        dbConnection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            dateStrings: 'date'
        })
        dbConnection.connect(error => {
            if (error)
            {
                dbConnection = null
                reject(error)
            }
            resolve()
        })
    })
}

const getDbConnection = () => {
    if (dbConnection) return dbConnection
    console.log('The connection to the db is not open yet, call initDb() first')
}

module.exports = {
    initDb,
    getDbConnection
}