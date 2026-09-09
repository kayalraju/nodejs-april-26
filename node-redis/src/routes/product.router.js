const express = require("express");
const productController = require("../controller/product.controller");
const Validation = require("../validation");
const ProductValidation = require("../validation/product.validate");
const router = express.Router();


router.get("/product", productController.getProduct);
router.post("/product/create",Validation.validate(ProductValidation.CreateProduct), productController.CreateProduct);
router.get("/product/:slug", productController.getsingleProduct);

module.exports = router;