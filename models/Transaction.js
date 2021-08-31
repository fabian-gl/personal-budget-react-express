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
            type: DataTypes.DATEONLY
        },
        user_id: {
            allowNull: true, // change!
            default: 1,
            type: DataTypes.INTEGER
        }
    })
    
    await Transaction.sync()
}

