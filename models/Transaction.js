const { DataTypes } = require('sequelize')

let Transaction

exports.getTransactionModel = () => Transaction

exports.initTransactionModel = async sequelize => {
    Transaction = sequelize.define('Transaction', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        amount: {
            allowNull: false,
            type: DataTypes.DECIMAL(14, 2)
        },
        type: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        user_id: {
            allowNull: true, // change!
            type: DataTypes.INTEGER
        }
    })
    
    await Transaction.sync()
}

