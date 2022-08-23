const jwt = require("jsonwebtoken");


exports.auth = (req, res, next) => {
    var id = req.params.employee_id
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader, id);
    if (bearerHeader != undefined) {
        const splitToken = bearerHeader.split(" ");
        let token = splitToken[1]
        req.token = token

        jwt.verify(req.token, "jeet", (err, data) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: err
                })
            } else {
                if (id == data.id) {
                    next()
                } else {
                    res.json({
                        code: 400,
                        msg: "Authentication failled please login first..",
                    })
                }
            }
        })
    } else {
        res.json({
            code: 400,
            msg: "Token not found"
        })
    }
}

exports.checkLogin = (req, res, next) => {
    var id = req.session.user
    if (id) {
        next()
    } else {
        return res.json({ code: 400, msg: "session out Please login first.." })
    }
}