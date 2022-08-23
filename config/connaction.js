var mysql=require('mysql2')
var mysqlconnaction=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123#@!',
    database: 'employee_db'
});



mysqlconnaction.connect((err)=>{
    if(err){
        console.log("server is not connacted",err);
    }else{
        console.log("mysql server connacted sucessfully");
    }
})


module.exports = mysqlconnaction