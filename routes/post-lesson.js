const express=require('express');
const router=express.Router();
const mysql=require('mysql')

/* const db=mysql.createConnection({
  host:"sql205.infinityfree.com",
  user:"if0_34968317",
  password:"xoFCZQEdrlvUTN",
  database:"if0_34968317_test_try",
  charset : 'utf8mb4',
}) */

const db=mysql.createConnection({
    host:"sql11.freemysqlhosting.net",
    user:"sql11644520",
    password:"JRgbfIDZQN",
    database:"sql11644520",
    /*connectionLimit: 50,
      queueLimit: 0,
      waitForConnection: true*/
    //charset : 'utf8mb4_unicode_ci',
  })


router.get('/',(req,res)=>{
    res.send("hello word")
})

              //registermember
router.post('/registermember',async(req,res)=>{
     

     db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber} `,(errors,resultes)=>{

          const matchPhoneNumber=resultes.map((re)=>{
            //console.log(re.phone_number==req.body.phoneNumber)
            return re.phone_number;
          })
     if (errors) {
      //console.log(errors)
     }
         if (matchPhoneNumber!=req.body.phoneNumber) {

             /****************************************** */
             db.query(`SELECT * FROM Phone_Number_List WHERE phone_number=${req.body.phoneNumber}`,(error,result)=>{
              const phoneNumberExist=result.map((re)=>{
                return re.phone_number
              })
    
              if (phoneNumberExist==req.body.phoneNumber) {
             /****************************************** */
             const memberNumber=req.body.phoneNumber
             const memberName=req.body.name
             const g=memberName.length-2
             const memberId= memberName.slice(0,2) + memberNumber.slice(6)
             const q="INSERT INTO members_data (`name`,`father_name`,`grand_father_name`,`email`,`gender`,`campus`,`dept`,`city`,`phone_number`,`register_date`,`personal_id`) VALUES (?)"
             const values= [req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.email,req.body.gender,req.body.campus,req.body.department,req.body.city,req.body.phoneNumber,new Date(),memberId];
                  
                db.query(q,[values],(err,data)=>{
                  if(data){
                    db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber}`,(e,re)=>{
                      console.log(re.map((r)=>r.personal_id))
                      res.json({
                        id:re.map((r)=>r.personal_id),
                        name:re.map((r)=>r.name),
                        father_name:re.map((r)=>r.father_name),
                        grand_father_name:re.map((r)=>r.grand_father_name),
                        email:re.map((r)=>r.email),
                        gender:re.map((r)=>r.gender),
                        campus:re.map((r)=>r.campus),
                        dept:re.map((r)=>r.dept),
                        city:re.map((r)=>r.city),
                        phone_number:re.map((r)=>r.phone_number),
                        register_date:re.map((r)=>r.register_date),

                        response:'',
                        registerd:'Registerd'
                      })
                    })
                  
                  //console.log('ok')
          
          
          
                  }else{
                      //console.log(err)
                  res.send(err)
          
                  }
               } )
         /*******************************************/
              } else {
                res.json({
                  id:'',
                  response:'Your phone number not on the list',
                })
    
              }  
        } )
    
            /*******************************************/
         } else {
          res.json({
            id:'',
            response:'Try another phone number',
          })

         }

     })






   


    
  
   // GRANT ALL PRIVILEGES ON * . * TO 'root'@'localhost';
   //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '0925090339';
   //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '0925090339';

  
  })    
  
  /* addphonenumber addphonenumber addphonenumber addphonenumber addphonenumber addphonenumber*/
      
  router.post('/addphonenumber',async(req,res)=>{
    const q="INSERT INTO Phone_Number_List (`phone_number`) VALUES (?)"
    const v=[req.body.phoneNumber];
    db.query(`SELECT * FROM Phone_Number_List WHERE phone_number =${req.body.phoneNumber} `,(err,result)=>{
            const existPhoneNumber=result?.map((re)=>{
        return re.phone_number
   })
       if(existPhoneNumber==req.body.phoneNumber){
        res.json('Duplicated entry')
       }else{

           db.query(q,[v],(error,data)=>{
          if(data){
           res.json('registerd')
          }else{
           //console.log(error)
          }
          
        })

       }

       
     
    })
    
  })

  /******************************************************************************************************* */
     
  router.get('/listofmembers',async(req,res)=>{

      db.query(`SELECT * FROM members_data `,(err,data)=>{
             if(data){
              //console.log(data)
              res.json(data)
             }else{
              //console.log(err)
             }
      })
  })

  router.get('/listofphonenumber',async(req,res)=>{

    db.query(`SELECT * FROM Phone_Number_List `,(err,data)=>{
           if(data){
            //console.log(data)
            res.json(data)
           }else{
            //console.log(err)
           }
    })
})

  /******************************************************************************************************* */

  
/*
  router.get(`/fetchmember/:phone_number`,(req,res)=>{
    db.query(`SELECT * FROM members_data WHERE phone_number=${req.params.phone_number}`,(err,data)=>{
      if (data) {
        res.json(data)
        console.log(data.map((d)=>d.name))
      } else {
        
      }
    })
  })*/
  router.get(`/fetchmember/:phone_number`,(req,res)=>{
  db.query(`SELECT * FROM members_data WHERE phone_number=${req.params.phone_number}`,(err,re)=>{
    res.json({
                        id:re.map((r)=>r.personal_id),
                        name:re.map((r)=>r.name),
                        father_name:re.map((r)=>r.father_name),
                        grand_father_name:re.map((r)=>r.grand_father_name),
                        email:re.map((r)=>r.email),
                        gender:re.map((r)=>r.gender),
                        campus:re.map((r)=>r.campus),
                        dept:re.map((r)=>r.dept),
                        city:re.map((r)=>r.city),
                        phone_number:re.map((r)=>r.phone_number),
                        register_date:re.map((r)=>r.register_date),
    })
        //console.log( re.map((r)=>r.name))
  })
})
  /*****************************************************UPDATE************************************************** */

     router.put(`/updatemember`,(req,res)=>{
      db.query(`UPDATE members_data 
      
      SET name=?,father_name=?,grand_father_name=?,email=?,gender=?,campus=?,dept=?,city=?,phone_number=?
      WHERE phone_number=${req.body.phoneNumber} `,[req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.email,req.body.gender,req.body.campus,req.body.department,req.body.city,req.body.phoneNumber],(err,data)=>{
  if (data) {
    
    res.json('You have successfully updated your profile')

  } else {
    res.json('try again')
  }
      })
     })
    /******************************************************************************************************* */
  router.get(`/delete/:phone_number`,(req,res)=>{
    db.query(`DELETE FROM members_data WHERE phone_number = ${req.params.phone_number}`,(err,data)=>{
      if (data) {
        //console.log(data + 'deleted')
        res.json('ok')
      }
      //console.log(err)
    })
  })

  router.get(`/deletephonenumber/:phone_number`,(req,res)=>{
    db.query(`DELETE FROM Phone_Number_List WHERE phone_number = ${req.params.phone_number}`,(err,data)=>{
      if (data) {
        console.log(data + req.params.phone_number)
        res.json('ok')
      }
      console.log(err)
    })
  })
        /******************************************************************************************************* */

        router.get(`/searchbyname/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM members_data WHERE name LIKE '${req.params.searchText}%'`,(err,re)=>{
            if (re) {
              res.json(re)
              console.log(re)
            }else{
              console.log(err)
            }
          })
        })

        router.get(`/searchbyphonenumber/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM members_data WHERE phone_number = ${req.params.searchText}`,(err,re)=>{
            if (re) {
              res.json(re)
              //console.log(re)
            }else{
              //console.log(err)
            }
          })
        })


        router.get(`/searchphonenumber/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM Phone_Number_List WHERE phone_number = ${req.params.searchText}`,(err,re)=>{
            if (re) {
              res.json(re)
              console.log(re)
            }else{
              console.log(err)
            }
          })
        })
        /******************************************************************************************************* */

module.exports=router