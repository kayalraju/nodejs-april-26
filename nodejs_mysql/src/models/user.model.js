const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbcon');


const UserTable = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://via.placeholder.com/150'
    },
    emali: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: true
})

module.exports = UserTable;