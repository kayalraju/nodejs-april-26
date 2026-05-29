const express=require('express');
const HomeController = require('../controller/HomeController');
const ProductController = require('../controller/ProductController');

const router=express.Router();



router.get('/',HomeController.index);
router.get('/about',HomeController.about);


//carc ejs

router.get('/add',ProductController.addView)
router.post('/create/product',ProductController.createProduct)
router.get('/list',ProductController.listView)


module.exports=router;