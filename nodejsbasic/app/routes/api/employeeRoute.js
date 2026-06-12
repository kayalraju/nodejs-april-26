const express=require('express');
const EmployeeController = require('../../controller/EmployeeController');
const validate = require('../../middleware/validate');
const employeeValidation = require('../../utils/employeeValidate');


const router=express.Router();


router.post('/create/employee',validate(employeeValidation),EmployeeController.createEmployee)




module.exports=router;  