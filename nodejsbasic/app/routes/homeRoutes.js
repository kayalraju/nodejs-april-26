const express=require('express');
const HomeController = require('../controller/HomeController');

const router=express.Router();



router.get('/',HomeController.index);





module.exports=router;