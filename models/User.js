const { DataTypes } = require('sequelize')

let User

exports.getUserModel = () => User

exports.initUserModel = async sequelize => {
    User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    })
    
    await User.sync()
}

