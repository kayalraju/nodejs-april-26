const express=require('express');
const ProductController = require('../../controller/api/ProductController');

const router=express.Router();


router.post('/create/product',ProductController.createProduct)
router.get('/product',ProductController.getProduct)



module.exports=router;  