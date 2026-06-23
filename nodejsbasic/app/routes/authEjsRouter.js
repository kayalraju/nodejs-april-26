const express=require('express');
const AuthEjsController = require('../controller/AuthEjsController');
const AuthCheck = require('../middleware/AuthCheck');


const router=express.Router();



router.get('/register',AuthEjsController.register)
router.post('/register/store',AuthEjsController.registerstore)
router.get('/login',AuthEjsController.login)
router.post('/login/store',AuthEjsController.loginstore)
router.get('/dashboard',AuthCheck,AuthEjsController.dashboard);
router.get('/logout',AuthCheck,AuthEjsController.logout);



module.exports=router;