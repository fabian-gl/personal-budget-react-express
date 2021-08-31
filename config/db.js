const { Sequelize } = require('sequelize')

const { initTransactionModel } = require('../models/Transaction')
const { initUserModel } = require('../models/User')


exports.initDb = async () => {
    return new Promise((resolve, reject) => {
        const sequelize = new Sequelize(
            process.env.DATABASE_NAME, 
            process.env.DATABASE_USER, 
            process.env.DATABASE_PASSWORD,
            {
                host: process.env.DATABASE_HOST,
                dialect: 'mysql',
                logging: false
            })
        sequelize.authenticate()
        .then(async () => {
            await initTransactionModel(sequelize)
            await initUserModel(sequelize)
            resolve()
        })
        .catch(reject)
    })

}