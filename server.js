var express=require('express')
var connaction=require("./config/connaction")
var app=express()
app.use(express.json())
var session = require('express-session');


app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    cookie: { maxAge: 60000 }
}))

app.get("/helloworld",(req,res)=>{
    res.send("helloworld")
})


let employees = require("./routes/employee_info");
let attandances = require("./routes/attandance_info")


app.use("/api",employees);
app.use("/api",attandances);


app.listen(7000,()=>{
    console.log("server is running on port "+ 7000);
})