const express = require ("express");
const cors=require('cors');
const cookieParser=require("cookie-parser")
const mysql=require('mysql')
const bcrypt=require('bcryptjs')
const dotenv = require('dotenv').config();
const jwt=require("jsonwebtoken")
const path = require("path");



const app =express()
app.use(cors());
app.use(cookieParser())
app.use(express.json());

/// CREATA USER 'me'@'localhost' IDENTIFIED BY 'password';
/// CREATE USER 'someuser'@'localhost' IDENTIFIED BY 'somepassword';

/*
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"0925090339",
    database:"test_try",
    charset : 'utf8mb4',
  }) */
  const db=mysql.createConnection({
    host:"sql11.freemysqlhosting.net",
    user:"sql11665997",
    password:"DryhiQVTsY",
    database:"sql11665997",
    /*connectionLimit: 50,
      queueLimit: 0,
      waitForConnection: true*/
    //charset : 'utf8mb4_unicode_ci',
  })
  
  app.use("/images", express.static(path.join(__dirname, "public/images")));


  var del = db._protocol._delegateError;
db._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};

app.get("/",(req,res)=>{
  res.send('welcom')
})

const postLesson= require('./routes/post-lesson')

app.use('/membersdata',postLesson)




const PORT=process.env.PORT || 9000
app.listen(PORT,()=>{
    console.log('welcom-back')
})