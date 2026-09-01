const express=require('express');
const EmployeeController = require('../../controller/EmployeeController');
const validate = require('../../middleware/validate');
const employeeValidation = require('../../utils/employeeValidate');


const router=express.Router();


//router.post('/create/employee',validate(employeeValidation),EmployeeController.createEmployee)

/**
* @swagger
* /api/create/employee:
*   post:
*     summary: create Employee
*     tags:
*       - Employee
*     produces:
*       - application/json
*     parameters:
 *      - in: body
 *        name: Add employee
 *        description: Add employee in MongoDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - age
 *            - phone
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            age:
 *              type: string
 *            phone:
 *              type: string
 *     responses:
 *        200:
 *          description: employee data added
 *        400:
 *          description: Bad Request
*        500:
*          description: Server Error
*/
router.post('/create/employee',EmployeeController.createEmployee)

/**
* @swagger
* /api/employee:
*   get:
*     summary: get Employee
*     tags:
*       - Employee
*     produces:
*       - application/json
*     responses:
 *        200:
 *          description: employee data added
 *        400:
 *          description: Bad Request
*        500:
*          description: Server Error
*/
router.get('/employee',EmployeeController.getEmployees)




module.exports=router;  