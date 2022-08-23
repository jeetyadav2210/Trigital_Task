let { add_employees_attendance,employees_attendance_details,employees_attendance_list} = require("../controller/attandance_info");
let { auth,checkLogin } = require("../helper")
var express = require('express');
var router = express.Router();

router.post("/add-employees-attendance/:employee_id",checkLogin, auth, add_employees_attendance);
router.get("/employees-attendance-info/:employee_id",checkLogin,auth,employees_attendance_details)
router.get("/employees-attendance-list",employees_attendance_list)


module.exports = router