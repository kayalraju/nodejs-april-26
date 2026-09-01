const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbcon');


const StudentTable = sequelize.define('student', {
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
    course: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: true
})

module.exports = StudentTable;