const express = require('express')
const cors  = require('cors');
const app = express()
const Admin = require('./db/Admin')
const AddStudent = require('./db/AddStudent')
require('./db/config')

app.use(express.json())
app.use(cors())

app.post("/adminsignup",async (req,res)=>{
    let admin = new Admin(req.body);
    let result = await admin.save();
    res.send(result)
})

app.get("/adminlogin",async (req,res)=>{
    let admin =await Admin.findOne(req.body);
    if(req.body.email && req.body.password)
    {
        if(admin)
        {
         res.send(admin)
        }
        else
        {
          res.send({result:"No Match Found"})
        }
    }
    else
    {
      res.send({result:"No Match Found"})
    }
  
})

app.post("/addstudent",async (req,res)=>{
  // res.send("hello")
  let addstudent = new AddStudent(req.body);
  let result = await addstudent.save();
  res.send(result);
  
})

app.listen(5000);