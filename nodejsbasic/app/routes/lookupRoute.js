const express=require('express');
const lookupController = require('../controller/lookupController');

const router=express.Router();


router.post('/create/category',lookupController.createCategory)
router.get('/category',lookupController.allCategory)

router.post('/create/subcategory',lookupController.createsubCategory)
router.get('/subcategory',lookupController.allsubCategory)

module.exports=router;