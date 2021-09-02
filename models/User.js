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
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },        
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password_hash: {
            allowNull: false,
            type: DataTypes.STRING
        }
    })
    
    await User.sync()
    return User
}

