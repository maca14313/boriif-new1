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
    database:"boriif",
    charset : 'utf8mb4',
  }) */
  
  const db=mysql.createConnection({
    host:"sql7.freemysqlhosting.net",
    user:"sql7706449",
    password:"gQAzPjTzQ8",
    database:"sql7706449",
    
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
  res.send('welcom from boriif server')
})

const postLesson= require('./routes/post-lesson')

app.use('/membersdata',postLesson)




const PORT=process.env.PORT || 9000
app.listen(PORT,()=>{
    console.log('welcom-back')
})