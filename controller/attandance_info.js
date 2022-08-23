let connection = require("../config/connaction");


exports.add_employees_attendance = (req, res) => {
    const {attendance } = req.body
    const {employee_id} = req.params;
    let dateCheckQuery = 'SELECT * FROM employee_attendance WHERE DATE(attendance_date) = CURDATE() AND employee_id=?'
    connection.query(dateCheckQuery, employee_id, (err, row) => {
        console.log(err, row);
        if (err) {
            res.json({
                err: "Something went wrong!",
                code: 400
            })
        } else {
            if (row.length > 0) {
                res.json({
                    err: "Attendance already added! if you want to update Attendance then use update button.",
                    code: 400
                })
            } else {
                connection.query(`INSERT INTO employee_attendance(employee_id,attendance) VALUES ('${employee_id}','${attendance}')`, (err, row) => {
                    console.log(err, row);
                    if (err) {
                        res.json({
                            err: "Something went wrong!",
                            code: 400
                        })
                    } else {
                        res.json({ code: 200, msg: "Employee attendance added sucessfully.." })
                    }
                })
            }
        }
    })


};



exports.employees_attendance_details = (req, res) => {
    const {employee_id} = req.params;
    connection.query('SELECT *FROM employee_attendance INNER JOIN employee_data ON employee_attendance.employee_id = employee_data.employee_id WHERE employee_attendance.employee_id =?',employee_id, (err, rows, fields) => {
        if (err) {
            res.json({
                code: 400,
                msg: err
            })
        } else {
            res.json({
                code: 200,
                msg: rows
            })
        }

        console.log(rows[0]);
    });

}


exports.employees_attendance_list = (req, res) => {
    connection.query('SELECT *FROM employee_attendance INNER JOIN employee_data ON employee_attendance.employee_id = employee_data.employee_id', (err, rows, fields) => {
        if (err) {
            res.json({
                code: 400,
                msg: err
            })
        } else {
            rows.map((elem)=>{[
                elem.gender = "male"
            ]})
            res.json({
                code: 200,
                msg: rows
            })
        }

        console.log(rows[0]);
    });

}