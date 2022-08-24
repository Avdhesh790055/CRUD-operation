const sql = require('mssql');                //import
const express= require('express');           // import
const app=express();                         // import

const { response } = require('express');
const path= require('path');

const bodyParser= require("body-Parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var config = {                          // variable  config will  contain configuration 
    user :'sa' ,                         // of  data base
    password : 'Avdhesh@123' ,
    server : 'AVDHESHLAPTOP\\SQLEXPRESS',
    database : 'company',
    options: {
        encrypt : false,
        useUTC : true,
    }
}
// now  i  will call connect function of  sql
sql.connect(config,function(err){
    if(err)console.log(err)
    else  console.log("connection is successful.")
})
app.listen(8080, function(err){
    if(!err)
    console.log("listening at port 8080")
    else console.log(err);
})
//now  create end points
//home page
app.get('/',(request,response) =>{
    response.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/add.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/add.html'));
})

app.get('/update.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/update.html'));
})
app.get('/delete.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/delete.html'));
})

//  add  employee to  database
app.post('/add',(request,response) => {
    // response.send(request.body);
    const {empid,empname,designation,mgrid,department} = request.body
    var req = new sql.Request();
    req.query("insert into employee values ('"+empid+"','"+empname+"','"+designation+"','"+mgrid+"','"+department+"')", function(recordset, err)
    {
        if(err) console.log(err);
        else
         response.send(recordset);
        response.redirect("../");
    });
});

app.post('/update',(request,response) => {
    // response.send(request.body);
    const {empid,empname,designation,mgrid,departmentid} = request.body
    var req = new sql.Request();
    req.query("update employee set Emp_name='"+empname+"',Designation='"+designation+"',Mgr_Id='"+mgrid+"',Department_Id='"+departmentid+"' where Emp_id='"+empid+"'" , function(recordset, err)
    {   
        if(err) console.log(err);
        else
         response.send(recordset);
        response.redirect("../");
    });  
          
});



app.post('/delete',(request,response) => {
    // response.send(request.body);
    const {empid} = request.body
    var req = new sql.Request();
    req.query("delete from employee where Emp_Id='"+empid+"' ", function(recordset, err)
    {
        if(err) console.log(err);
        else
         response.send(recordset);
        response.redirect("../");
    });
});


/*/get data from database
app.get('/', function(request,response){
    var req = new sql.Request();
    req.query('',function(recordset,error){
        if(err)
        console.log(error);
        else
        response.render('/',{data:recordset});
    });
});

*/
