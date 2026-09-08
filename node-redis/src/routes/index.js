const express = require("express");
const router = express.Router();

const ProductRoute=require("./product.router");

router.use("/api",ProductRoute)





module.exports = router;