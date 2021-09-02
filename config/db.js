const { Sequelize } = require('sequelize')
const mysql = require('mysql2/promise')

const { initTransactionModel } = require('../models/Transaction')
const { initUserModel } = require('../models/User')


exports.initDb = async () => {
    return new Promise(async (resolve, reject) => {

        const connection = await mysql.createConnection({ 
            host: process.env.DATABASE_HOST, 
            port: 3306, 
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD
        })
        
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME}\`;`);
    
        
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
            const Transaction = await initTransactionModel(sequelize)
            const User = await initUserModel(sequelize)

            User.hasMany(Transaction)
            Transaction.belongsTo(User)
            console.log('Created associations')
            resolve()
        })
        .catch(reject)
    })
}