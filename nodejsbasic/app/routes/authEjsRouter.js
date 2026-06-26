const express=require('express');
const AuthEjsController = require('../controller/AuthEjsController');
const AuthCheck = require('../middleware/AuthCheck');
const AdminAuthCheck = require('../middleware/adminAuthCheck');


const router=express.Router();



router.get('/register',AuthEjsController.register)
router.post('/register/store',AuthEjsController.registerstore)
router.get('/login',AuthEjsController.login)
router.post('/login/store',AuthEjsController.loginstore)
router.get('/dashboard',AuthCheck,AuthEjsController.dashboard);
router.get('/logout',AuthCheck,AuthEjsController.logout);



//admin
router.get('/admin/login',AuthEjsController.adminlogin)
router.post('/admin/login/store',AuthEjsController.adminloginstore)

router.get('/admin/dashboard',AdminAuthCheck,AuthEjsController.admindashboard);
router.get('/admin/logout',AdminAuthCheck,AuthEjsController.adminlogout);

module.exports=router;