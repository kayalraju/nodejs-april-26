
const Employee=require('../models/employee')


class EmployeeController {
  async createEmployee(req, res) {
    try {
      const { name, email, phone, age } = req.body;
      const employee = new Employee({
        name,
        email,
        phone,
        age,
      });
      const result = await employee.save();
     return res.status(201).json({
       status: true,
       message: "Employee created successfully",
       data: result,
     })
    } catch (error) {
      console.log(error);
    }
  }


  async getEmployees(req, res) {
    try {
      const employees = await Employee.find();
      return res.status(200).json({
        status: true,
        message: "Employees retrieved successfully",
        data: employees,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new EmployeeController();
