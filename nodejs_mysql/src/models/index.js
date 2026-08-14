const sequelize = require("../config/dbcon");
const Product = require("./product.model");
const User = require("./user.model");


// Sync all models
sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error(" Error syncing DB:", err));

module.exports = {Product,User};
