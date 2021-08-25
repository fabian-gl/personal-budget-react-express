const { Sequelize } = require('sequelize')
const { initTransactionModel } = require('../models/Transaction')

const initDb = async () => {
    return new Promise((resolve, reject) => {
        const sequelize = new Sequelize(
            process.env.DATABASE_NAME, 
            process.env.DATABASE_USER, 
            process.env.DATABASE_PASSWORD,
            {
                host: process.env.DATABASE_HOST,
                dialect: 'mysql'
            })
        sequelize.authenticate()
        .then(() => {
            initTransactionModel(sequelize)
            resolve()
        })
        .catch(reject)
    })

}

module.exports = {
    initDb
}