let { add_employees,employee_info,login,remove_employee,update_employees,logout} = require("../controller/employee_info");
var express = require('express');
var router = express.Router();

router.post("/add-employees",  add_employees);
router.get("/employee-info/:emp_id",employee_info)
router.put("/update-employee",update_employees)
router.delete("/remove-employee/:emp_id",remove_employee)
router.post("/login",login)
router.get("/logout",logout)


module.exports = router