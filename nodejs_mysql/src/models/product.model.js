const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbcon');


const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://via.placeholder.com/150'
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true
})

module.exports = Product;