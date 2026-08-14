const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejs_mysql", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
