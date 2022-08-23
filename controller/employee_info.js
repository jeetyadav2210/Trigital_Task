let connection = require("../config/connaction")
const jwt = require("jsonwebtoken");

exports.add_employees = (req, res) => {
    const { username, phone_number, age, email, password } = req.body
    if (!username ||!phone_number || !age || !email || !password) {
        return res.json({ code: 400, msg: "Please add required field.." })
    }

    let sqlq = 'SELECT * FROM employee_data WHERE email=?'
    connection.query(sqlq, email, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ code: 400, msg: "something went wrong!" })
        } else {
            if (data.length == 0) {
                connection.query(`INSERT INTO employee_data(username,email,password,phone_number,age) VALUES ('${username}','${email}','${password}','${phone_number}','${age}')`, (row) => {
                    if (row) {
                        res.json({

                            err: row,
                            code: 400
                        })
                    } else {
                        res.json({ code: 200, msg: "Employee added sucessfully.." })
                    }
                })
            } else {
                res.send("Email already exits please login..")
            }
        }
    })
}


exports.update_employees = (req, res) => {
    const { username, phone_number, age, email, password, emp_id } = req.body
    console.log(req.body);
    if (!emp_id) {
        return res.json({ code: 400, msg: "Please add employee Id" })

    }
    if (email) {
        return res.json({ code: 400, msg: "Email can NOT be update" })
    }

    let dbQuery = `UPDATE employee_data set`
    if (phone_number) {
        dbQuery += ' phone_number = ' + connection.escape(phone_number);
    }
    if (age) {
        dbQuery += ',age = ' + connection.escape(parseInt(age));
    }
    if (password) {
        dbQuery += ', password = ' + connection.escape(password);
    }
    if (username) {
        dbQuery += ', username = ' + connection.escape(username);
    }

    let sqlq = 'SELECT * FROM employee_data WHERE employee_id=?'
    connection.query(sqlq, emp_id, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ code: 400, msg: "something went wrong!" })
        } else {
            if (data.length > 0) {
                connection.query(dbQuery, (err, resp) => {
                    console.log(err, resp);
                    if (err) {
                        res.json({
                            err: "something went wrong!..",
                            code: 400
                        })
                    } else {
                        res.json({ code: 200, msg: "Employee updated sucessfully.." })
                    }
                })
            } else {
                res.send("Employee data NOT found..")
            }
        }
    })
}


exports.login = (req, res) => {
    const { email, password } = req.body
    var sql_query = 'SELECT* FROM employee_data WHERE email=?'
    connection.query(sql_query, email, (err, row) => {
        if (err) {
            return res.json({
                code: 400,
                msg: "something went wrong!"
            })
        } else {
            if (row.length > 0) {
                if (row[0].password == password) {
                    req.session.user = row[0];
                    let id = row[0].employee_id
                    jwt.sign({ id }, "jeet", { expiresIn: '1h' }, (err, token) => {
                        res.json({
                            code: 200,
                            msg: "login succefully",
                            data: row[0],
                            token: token
                        })
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: "Password do NOT match"
                    })
                }
            } else {
                res.json({
                    code: 400,
                    msg: "Email Not Found Please Sign-up.."
                })

            }
        }
    })
}


exports.employee_info = (req, res) => {
    const { emp_id } = req.params
    var sql_query = 'SELECT* FROM employee_data WHERE employee_id=?'
    connection.query(sql_query, emp_id, (err, row) => {
        if (err) {
            return res.json({
                code: 400,
                msg: "something went wrong!"
            })
        } else {
            if (row.length > 0) {
                res.json({
                    code: 200,
                    data: row[0],
                })
            } else {
                res.json({
                    code: 400,
                    msg: "employee data Not Found"
                })

            }
        }
    })
}

exports.remove_employee = (req, res) => {
    const { emp_id } = req.params
    let query_data = `DELETE FROM employee_data where employee_id=?`
    connection.query(query_data, emp_id, (err, data) => {
        if (err) {
            res.json({
                code: 400,
                msg: "something went wrong!"
            })
        } else {
            res.json({
                code: 200,
                msg: "employee delete sucessfully"
            })
        }
    })
};

logoutUser = (req, res, callback)=>{
    var sess = req.session.user;
    console.log(req.session);
    if(sess){
        req.session.user = null;
        req.session.destroy();
        return callback(null, {'success': true, "message": "user logout successfully"});
    }
    callback(null, {'success': true, "message": "user logout successfully"});
}

exports.logout=(req,res)=>{
    logoutUser(req, res, function(err, data) {
        if (err) {
          res.json({ 'error': data.error, 'message': data.message });
        } else {
          res.json({ 'success': data.success, 'message': data.message });
        }
      });

}
