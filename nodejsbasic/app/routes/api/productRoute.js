const express=require('express');
const ProductController = require('../../controller/api/ProductController');
const ProductImage = require('../../utils/fileUpload');

const router=express.Router();


router.post('/create/product',ProductImage.single('image'),ProductController.createProduct)
router.get('/product',ProductController.getProduct)
router.get('/product/:id',ProductController.getsingleProduct)
router.put('/product/update/:id',ProductController.updateProduct)
router.delete('/product/delete/:id',ProductController.deleteProduct)



module.exports=router;  