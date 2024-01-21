
const express=require('express');
const router=express.Router();
const mysql=require('mysql')
const multer = require('multer')
const path = require('path');
const fs= require('fs');






const db=mysql.createConnection({
    host:"sql11.freemysqlhosting.net",
    user:"sql11678624",
    password:"sJh4GPp6h1",
    database:"sql11678624",
   
  }) 
/*
 const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"0925090339",
    database:"boriif",
    charset : 'utf8mb4',
  }) */

router.get('/',(req,res)=>{
    res.send("hello word")
})

router.post('/registermember',async(req,res)=>{
     
 console.log('poiugghiuyftghyu')
     db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber} `,(errors,resultes)=>{

          const matchPhoneNumber=resultes.map((re)=>{
            return re.phone_number;
          })
     
         if (matchPhoneNumber!=req.body.phoneNumber) {

             /****************************************** */
            
    
             /****************************************** */
             const memberNumber=req.body.phoneNumber
             const memberName=req.body.name
             const memberId= memberName.slice(0,2) + memberNumber.slice(8) + Math.floor(Math.random() * (9999 - 1000 + 1)+ 1000);
             const q="INSERT INTO members_data (`name`,`father_name`,`grand_father_name`,`gender`,`age`,`work_type`,`level_of_education`,`woreda`,`kebele`,`residential_address`,`home_address`,`phone_number`,`home_cell_phone_number`,`married`,`disability`,`representative`,`personal_id`,`register_date`) VALUES (?)"
             const values= [req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.gender,req.body.age,req.body.work_type,req.body.level_of_education,req.body.woreda,req.body.kebele,req.body.residential_address,req.body.home_address,req.body.phoneNumber,req.body.home_cell_phone_number,req.body.married,req.body.disability,req.body.representative,memberId,new Date()];
                  
                db.query(q,[values],(err,data)=>{
                  if(data){
                    db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber}`,(e,re)=>{
                      
                      
                      
                      
                      console.log(re.map((r)=>r.personal_id))
                      res.json({
                        id:re.map((r)=>r.personal_id),
                        name:re.map((r)=>r.name),
                        father_name:re.map((r)=>r.father_name),
                        grand_father_name:re.map((r)=>r.grand_father_name),
                        gender:re.map((r)=>r.gender),
                        age:re.map((r)=>r.age),
                        work_type:re.map((r)=>r.work_type),
                        level_of_education:re.map((r)=>r.level_of_education),
                        woreda:re.map((r)=>r.woreda),
                        kebele:re.map((r)=>r.kebele),
                        residential_address:re.map((r)=>r.residential_address),
                        home_address:re.map((r)=>r.home_address),
                        phone_number:re.map((r)=>r.phone_number),
                        home_cell_phone_number:re.map((r)=>r.home_cell_phone_number),
                        married:re.map((r)=>r.married),
                        disability:re.map((r)=>r.disability),
                        representative:re.map((r)=>r.representative),
                        personal_id:re.map((r)=>r.personal_id),
                        register_date:re.map((r)=>r.register_date),
                        response:'',
                        registerd:'Registerd'
                      })
                    })
                  
                    
          
                  }else{
                  res.send(err)
          
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
  })    
  

  /************************** img  *********************************** */
  var file_name;
  const filePath = path.join(__dirname, '../public/Images');

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null,filePath)
    },
    filename: function (req, file, cb) {
       const extension=file.mimetype.split("/")[1];
       let r = (Math.random() + 1).toString(36).substring(7)+(Math.floor(Math.random() * 10000) + 1000);
       file_name=`${req.params.id}.${extension}`
      //return cb(null, `${Date.now()}_${r}.${extension}`)
      return cb(null, `${req.params.id}.${extension}`)

    }
  })
 
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
       console.log('only img')
       
      cb('Error: Only image files are allowed!');
    }
  };
 
  const upload = multer({
    storage: storage,
    limits: {
      fileSize:209920, 
    },
    fileFilter: fileFilter,
  })


  router.post('/upload/:id/',upload.single('file'), (req, res) => {
    console.log(`./public/Images/${req.body.name}`)
    const q="INSERT INTO members_data (`course_img`) VALUES (?) "
 
    try {
       db.query(`UPDATE members_data SET personal_img=? WHERE personal_id='${req.params.id}' `,[file_name],(err,data)=>{
          if(data){

           
          res.json({
             success:'course created',
             err:'',
             ended:'ended',
 
          })
          console.log(data)
  
          }else{
              console.log(err)
              res.json({
                success:'',
                err:'try again',
                ended:'ended',
 
    
             })
  
          }
       } )
     } catch (error) {
       console.log(error)
       res.json({
          success:'',
          err:'try again',
          ended:'ended',
 
 
       })    } 
 
  })
 
  /************************** Log In  *********************************** */

  router.post('/loginmember',async(req,res)=>{
     
    //console.log(req.body.id)

    db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber} `,(errors,resultes)=>{

      if (resultes) {

        const matchPhoneNumber=resultes.map((re)=>{
        return re.personal_id;
         }) 
         if (matchPhoneNumber[0]==req.body.id) {
          res.json({
            id:resultes.map((r)=>r.personal_id),
            name:resultes.map((r)=>r.name),
            father_name:resultes.map((r)=>r.father_name),
            grand_father_name:resultes.map((r)=>r.grand_father_name),
            email:resultes.map((r)=>r.email),
            gender:resultes.map((r)=>r.gender),
            batch:resultes.map((r)=>r.batch),
            campus:resultes.map((r)=>r.campus),
            dept:resultes.map((r)=>r.dept),
            city:resultes.map((r)=>r.city),
            phone_number:resultes.map((r)=>r.phone_number),
            register_date:resultes.map((r)=>r.register_date),

            response:'',
            registerd:'Loged In'
          })
         } else {
          res.json({
            response:'incorrect intery',
          })
         }

      } else {
        res.json({
          response:'incorrect intery',
        })
      }
    
    
       

    })

 
 })    
  

    /* addphonenumber addphonenumber addphonenumber addphonenumber addphonenumber addphonenumber*/

  router.post('/addphonenumber',async(req,res)=>{
    const q="INSERT INTO Phone_Number_List (`phone_number`,`name`) VALUES (?)"
    const v=[req.body.phoneNumber,req.body.name];
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
            res.json('err')
                    }
          
        })

       }

       
     
    })
    
  })

  /******************************************************************************************************* */
     
  router.get('/listofmembers',async(req,res)=>{

      db.query(`SELECT * FROM members_data `,(err,data)=>{
             if(data){
              res.json(data)
             }else{
              res.json('err')
                         }
      })
  })
/******************************************************************************************************* */

  router.get('/listofphonenumber',async(req,res)=>{

    db.query(`SELECT * FROM Phone_Number_List WHERE reg != 'yes' `,(err,data)=>{
           if(data){
            res.json(data)
           }else{
            res.json('err')
                     }
    })
})

router.get('/listofphonenumber/reg',async(req,res)=>{

  db.query(`SELECT * FROM Phone_Number_List WHERE reg ='yes' `,(err,data)=>{
         if(data){
          res.json(data)
         }else{
          res.json('err')
          console.log(err)
                   }
  })
})

  /******************************************************************************************************* */


  router.get(`/fetchmember/:phone_number`,(req,res)=>{
  db.query(`SELECT * FROM members_data WHERE phone_number=${req.params.phone_number}`,(err,re)=>{
    res.json({
                    
                        id:re.map((r)=>r.personal_id),
                        name:re.map((r)=>r.name),
                        father_name:re.map((r)=>r.father_name),
                        grand_father_name:re.map((r)=>r.grand_father_name),
                        gender:re.map((r)=>r.gender),
                        age:re.map((r)=>r.age),
                        work_type:re.map((r)=>r.work_type),
                        level_of_education:re.map((r)=>r.level_of_education),
                        woreda:re.map((r)=>r.woreda),
                        kebele:re.map((r)=>r.kebele),
                        residential_address:re.map((r)=>r.residential_address),
                        home_address:re.map((r)=>r.home_address),
                        phone_number:re.map((r)=>r.phone_number),
                        home_cell_phone_number:re.map((r)=>r.home_cell_phone_number),
                        married:re.map((r)=>r.married),
                        disability:re.map((r)=>r.disability),
                        representative:re.map((r)=>r.representative),
                       
                       
    })
  })
})

router.get(`/fetchmemberbyid/:id`,(req,res)=>{   
  db.query(`SELECT * FROM members_data WHERE personal_id='${req.params.id}'`,(err,re)=>{
    res.json({
                    
                        id:re.map((r)=>r.personal_id),
                        name:re.map((r)=>r.name),
                        father_name:re.map((r)=>r.father_name),
                        grand_father_name:re.map((r)=>r.grand_father_name),
                        gender:re.map((r)=>r.gender),
                        age:re.map((r)=>r.age),
                        work_type:re.map((r)=>r.work_type),
                        level_of_education:re.map((r)=>r.level_of_education),
                        woreda:re.map((r)=>r.woreda),
                        kebele:re.map((r)=>r.kebele),
                        residential_address:re.map((r)=>r.residential_address),
                        home_address:re.map((r)=>r.home_address),
                        phone_number:re.map((r)=>r.phone_number),
                        home_cell_phone_number:re.map((r)=>r.home_cell_phone_number),
                        married:re.map((r)=>r.married),
                        disability:re.map((r)=>r.disability),
                        representative:re.map((r)=>r.representative),
                        total_amount_payed:re?.map((r)=>r.total_amount_payed),
                        amount_of_shares:re?.map((r)=>r.amount_of_shares),
                        personal_img:re?.map((r)=>r.personal_img),
                        payed_months:re?.map((r)=>r.payed_months),
                        register_date:re?.map((r)=>r.register_date),




                       
                       
    })
  })
})
  /*****************************************************UPDATE************************************************** */

     router.put(`/updatemember`,(req,res)=>{
      console.log('bbbbbbb')

      db.query(`UPDATE members_data 
      
      SET name=?,father_name=?,grand_father_name=?,gender=?,age=?,work_type=?,level_of_education=?,woreda=?,kebele=?,residential_address=?,home_address=?,phone_number=?,home_cell_phone_number=?,married=?,disability=?,representative=?
      WHERE personal_id='${req.body.id}' `,[req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.gender,req.body.age,req.body.work_type,req.body.level_of_education,req.body.woreda,req.body.kebele,req.body.residential_address,req.body.home_address,req.body.phoneNumber,req.body.home_cell_phone_number,req.body.married,req.body.disability,req.body.representative],(err,data)=>{
  if (data) {
    console.log(req.body.phoneNumber)
    console.log(data)
    res.json('You have successfully updated your profile')

  } else {
    console.log(err)
    res.json('try again')
  }
      })
     })
    /******************************************************************************************************* */
  router.get(`/delete/:id`,(req,res)=>{      
    db.query(`DELETE FROM members_data WHERE personal_id= '${req.params.id}'`,(err,data)=>{
      if (data) {
        console.log('success')
        res.json('ok')
      }else{
        console.log(err)

        res.json(err)
      }
    })
  })

  router.get(`/deletephonenumber/:phone_number`,(req,res)=>{
    db.query(`DELETE FROM Phone_Number_List WHERE phone_number = ${req.params.phone_number}`,(err,data)=>{
      if (data) {
        res.json('ok')
      }else{
        res.json(err)
      }
      
    })
  })
        /******************************************************************************************************* */

        router.get(`/searchbyname/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM members_data WHERE name LIKE '${req.params.searchText}%' OR phone_number LIKE '${req.params.searchText}%'`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
                        }
          })
        })

       /* router.get(`/searchbyphonenumber/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM members_data WHERE phone_number LIKE '${req.params.searchText}%'`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
                        }
          })
        }) */


        router.get(`/searchphonenumber/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM Phone_Number_List WHERE phone_number = ${req.params.searchText}`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
              
            }
          })
        })
        /******************************************************************************************************* */
       
        router.post('/ppayment',async(req,res)=>{

          try {
            
          
          db.query(`SELECT * FROM P_Payment WHERE personal_id='${req.body.id}' `,(errors,resultes)=>{

            if (errors) {
              res.json({
                response:"network error",
               })
            }
            const resultes_id = resultes.filter((re)=>{
              return re.personal_id==req.body.id
              
          })
          console.log('we',resultes_id.map((i)=>i.personal_id)[0]==req.body.id)

            if (resultes_id.map((i)=>i.personal_id)==req.body.id || resultes_id.map((i)=>i.personal_id)[0]==req.body.id) {
              console.log('match id')

              const resultes_trn=resultes.filter((re)=>re.trn==req.body.trn)
              //console.log(resultes_trn)
              if (resultes_trn.map((i)=>i.trn)!=req.body.trn && resultes_trn.map((i)=>i.trn)[0]!=req.body.trn) {
                console.log(req.body.type_of_payment,'type_of_payment')
                const q="INSERT INTO P_Payment (`trn`,`amount`,`bank_name`,`personal_id`,`type_of_payment`,`date_of_entry`) VALUES (?)"
              const values= [req.body.trn,req.body.amount,req.body.name_of_bank,req.body.id,req.body.type_of_payment,new Date()];
              db.query(q,[values],(err,data)=>{
                 if (data) {
                  console.log('new trn')
                    
                    res.json({
                      registerd:'delivered',
                    })
                 } else {
                   res.json({
                    response:'not delivered',
                   })
                 }
               
              })
              }else{
                console.log('match trn')
                res.json({
                  response:'incorrect trn',
                })

              }
            } else if(resultes_id.map((i)=>i.personal_id)[0]!=req.body.id) {
              console.log(resultes_id.map((i)=>i.personal_id)[0]==req.body.id)
              console.log(resultes_id.map((i)=>i.personal_id)==req.body.id)

              const q="INSERT INTO P_Payment (`trn`,`amount`,`bank_name`,`personal_id`,`type_of_payment`,`date_of_entry`) VALUES (?)"
              const values= [req.body.trn,req.body.amount,req.body.name_of_bank,req.body.id,req.body.type_of_payment,new Date()];
              db.query(q,[values],(err,data)=>{
                 if (data) {
                  console.log('new id')
                    res.json({
                      registerd:'delivered',
                    })
                 } else {
                   res.json({
                    response:'not delivered',

                   })
                 }
               
              })

            }else{
              res.json({
                response:'not delivered',

               })
            }
            
               
        
          })
        
        
        } catch (error) {
            res.json(error)
        }
        
        
        
        
        
        
         
        
        
        
        }) 
        
 /******************************************************************************************************* */
 router.post('/adminclientreceipt',async(req,res)=>{
  db.query(`SELECT * FROM members_data  WHERE phone_number='${req.body.phone}' `,(err,data)=>{
         if(data){
          const personal_id=data.map((m)=>m.personal_id)
          res.json(personal_id)
         }else{
          res.json('err')
                     }
  }) 
})

/******************************************************************************************************* */
         router.get('/approval',async(req,res)=>{

         try {
          db.query(`SELECT * FROM P_Payment WHERE approved='no' `,(errors,resultes)=>{
            if (resultes) {
              console.log(resultes)
               res.json(resultes)          
            } else {
              res.json(errors)
            }
         })
         } catch (error) {
          res.json(error)
         }

         })

/******************************************************************************************************* */
router.get('/ppaymentapproval',async(req,res)=>{

  try {
   db.query(`SELECT * FROM P_Payment WHERE approved='no' `,(errors,resultes)=>{
     if (resultes) {
       console.log(resultes)
        res.json(resultes)          
     } else {
       res.json(errors)
     }
  })
  } catch (error) {
   res.json(error)
  }

  })

/*****************************************************UPDATE************************************************** */
router.put(`/acceptaprrovalmonthly/:id/:personalid`,(req,res)=>{
 try {
  console.log('monthes')

  db.query(`SELECT * FROM All_info`,(Error,resultes)=>{
    if (resultes) {
      
      db.query(`SELECT * FROM members_data WHERE personal_id='${req.params.personalid}'`,(errors,re)=>{
        const old_payed_months=JSON.parse(re?.map((r)=>r.payed_months))
        const amount_of_months_to_add=JSON.parse(req.body.newAmount)/JSON.parse(resultes.map((p)=>p.monthly_payment))
        const new_payed_months=old_payed_months+amount_of_months_to_add

        
        const total_amount=JSON.parse(re?.map((r)=>r.total_amount_payed))
        const newAmount=JSON.parse(req.body.newAmount)
        const newTotalAmount=total_amount+newAmount
        const shares=Math.floor(newTotalAmount/500)
        console.log(shares)
        if (re) {
          
          db.query(`UPDATE members_data 
          
          SET total_amount_payed=?,amount_of_shares=?,payed_months=?
          WHERE personal_id='${req.params.personalid}' `,[newTotalAmount,shares,new_payed_months],(error,result)=>{
             if (result) {
              
              db.query(`UPDATE P_Payment 
      
              SET approved=?,added_months=?
              WHERE id=${req.params.id} `,['yes',amount_of_months_to_add],(err,data)=>{
            if (data) {
            
            res.json('You have successfully updated your profile')
            
            } else {
            res.json('try again')
            }
              }) 
    
             } else {
              res.json(error)
             }
    
        }) 
    
        } else {
          res.json(errors)
        }
       
      })


    }
    
  })



 
 } catch (error) {
  res.json(error)
 }
 })



 router.put(`/acceptaprroval/:id/:personalid`,(req,res)=>{
  try {
        console.log('not monthes')
       db.query(`SELECT * FROM members_data WHERE personal_id='${req.params.personalid}'`,(errors,re)=>{
         
         const total_amount=JSON.parse(re?.map((r)=>r.total_amount_payed))
         const newAmount=JSON.parse(req.body.newAmount)
         const newTotalAmount=total_amount+newAmount
         const shares=Math.floor(newTotalAmount/500)
         console.log(shares)
         if (re) {
           
           db.query(`UPDATE members_data 
           
           SET total_amount_payed=?,amount_of_shares=?
           WHERE personal_id='${req.params.personalid}' `,[newTotalAmount,shares],(error,result)=>{
              if (result) {
               
               db.query(`UPDATE P_Payment 
       
               SET approved=?
               WHERE id=${req.params.id} `,['yes'],(err,data)=>{
             if (data) {
             
             res.json('You have successfully updated your profile')
             
             } else {
             res.json('try again')
             }
               }) 
     
              } else {
               res.json(error)
              }
     
         }) 
     
         } else {
           res.json(errors)
         }
        
       })
 
 
     
 
 
 
  
  } catch (error) {
   res.json(error)
  }
  })
/******************************************************************************************************* */
/*****************************************************UPDATE************************************************** */
router.put(`/deleteaprroval/:id/:personalid`,(req,res)=>{
  try {
     const newTotalAmount=req.body.newAmount
     const shares=req.body.share
     const new_added_months=req.body.new_added_months
     console.log(shares)
       
       db.query(`UPDATE members_data 
       
       SET total_amount_payed=?,amount_of_shares=?,payed_months=?
       WHERE personal_id='${req.params.personalid}' `,[newTotalAmount,shares,new_added_months],(error,result)=>{
          if (result) {
            db.query(`DELETE FROM P_Payment WHERE id=${req.params.id}`,(err,data)=>{

        
         if (data) {
         res.json('You have successfully deleted this receipt')
         
         } else {
         res.json('try again')
         }
           }) 
 
          } else {
           res.json(error)
          }
 
     }) 
 
    
    
 
 
  
  } catch (error) {
   res.json(error)
  }
  })
 /******************************************************************************************************* */

 router.put(`/deleteunapproved/:id`,(req,res)=>{
  try {
 
            db.query(`DELETE FROM P_Payment WHERE id=${req.params.id}`,(err,data)=>{

        
         if (data) {
          console.log('You have successfully deleted this pending receipt')
         res.json('You have successfully deleted this receipt')
         
         } else {
         res.json('try again')
         }
           }) 
 
        
 
     
 
    
    
 
 
  
  } catch (error) {
   res.json(error)
  }
  })
 /******************************************************************************************************* */
 
  /******************************************************************************************************* */


  router.get(`/fetchmemberbyid/:id`,(req,res)=>{
    try {
      db.query(`SELECT * FROM members_data WHERE personal_id='${req.params.id}'`,(err,re)=>{
        console.log('amount_of_shares',re?.map((r)=>r.amount_of_shares))
        res.json({
          id:re?.map((r)=>r.personal_id),
          name:re?.map((r)=>r.name),
          father_name:re?.map((r)=>r.father_name),
          grand_father_name:re?.map((r)=>r.grand_father_name),
          email:re?.map((r)=>r.email),
          gender:re?.map((r)=>r.gender),
          batch:re?.map((r)=>r.batch),
          campus:re?.map((r)=>r.campus),
          dept:re?.map((r)=>r.dept),
          city:re?.map((r)=>r.city),
          phone_number:re?.map((r)=>r.phone_number),
          register_date:re?.map((r)=>r.register_date),
          total_amount_payed:re?.map((r)=>r.total_amount_payed),
          amount_of_shares:re?.map((r)=>r.amount_of_shares),
  })
      })
    } catch (error) {
      res.json(error)
    }
  })
    /*****************************************************UPDATE************************************************** */
/******************************************************************************************************* */


router.get(`/fetchmemberpaymentbyid/:id`,(req,res)=>{
  try {
    db.query(`SELECT * FROM P_Payment WHERE personal_id='${req.params.id}' AND approved='no'`,(err,re)=>{
      console.log(re)
      if (re) {
        res.json(re)
      } else {
        res.json(err)
      }
      
    })
  } catch (error) {
    res.json(error)
  }
 
})
  /*****************************************************UPDATE************************************************** */

  /******************************************************************************************************* */


router.get(`/fetchmemberpaymentbyidyes/:id`,(req,res)=>{
  try {
    db.query(`SELECT * FROM P_Payment WHERE personal_id='${req.params.id}' AND approved='yes'`,(err,re)=>{
      if (re) {
        res.json(re)
      } else {
        res.json(err)
      }
      
    })
  } catch (error) {
    res.json(error)
  }
 
})

router.get(`/fetchmemberpaymentbyidyessingle/:id/:trn`,(req,res)=>{
  try {
    db.query(`SELECT * FROM P_Payment WHERE personal_id='${req.params.id}' AND approved='yes' AND trn='${req.params.trn}'`,(err,re)=>{
      if (re) {
        res.json(re)
      } else {
        res.json(err)
      }
      
    })
  } catch (error) {
    res.json(error)
  }
 
})

router.get(`/fetchmemberpaymenttype`,(req,res)=>{
  try {
    db.query(`SELECT * FROM P_Payment WHERE approved='yes' AND type_of_payment='registration'`,(err,re)=>{
      if (re) {
        db.query(`SELECT * FROM P_Payment WHERE approved='yes' AND type_of_payment='monthly'`,(erree,rre)=>{
          if(rre){
            db.query(`SELECT * FROM P_Payment WHERE approved='yes' AND type_of_payment='donation'`,(erreer,rree)=>{
              if (rree) {
                db.query(`SELECT * FROM P_Payment WHERE approved='yes'`,(allerr,allres)=>{
                   if(allres){
                    res.json({
                      total_all_payment:allres.reduce((accumulator, currentObject) => {
                        return accumulator + JSON.parse(currentObject['amount']);
                      }, 0),
                      total_registration:re.reduce((accumulator, currentObject) => {
                       return accumulator + JSON.parse(currentObject['amount']);
                     }, 0),
                     total_monthly:rre.reduce((accumulator, currentObject) => {
                       return accumulator + JSON.parse(currentObject['amount']);
                     }, 0),
                     total_donation:rree.reduce((accumulator, currentObject) => {
                       return accumulator + JSON.parse(currentObject['amount']);
                     }, 0),
                     
     
                     })

                   }
                })
 
              }
            })
          }
        })
        //res.json(re)
      } else {
        res.json(err)
      }
      
    })
  } catch (error) {
    res.json(error)
  }
 
})


router.get(`/fetchmemberpaymenttypebyidyes/:id`,(req,res)=>{
  try {
    db.query(`SELECT * FROM P_Payment WHERE personal_id='${req.params.id}' AND approved='yes' AND type_of_payment='registration'`,(err,re)=>{
      if (re) {
        db.query(`SELECT * FROM P_Payment WHERE personal_id='${req.params.id}' AND approved='yes' AND type_of_payment='monthly'`,(erree,rre)=>{
          if(rre){
            db.query(`SELECT * FROM P_Payment WHERE personal_id='${req.params.id}' AND approved='yes' AND type_of_payment='donation'`,(erreer,rree)=>{
              if (rree) {
              
                res.json({
                 total_registration:re.reduce((accumulator, currentObject) => {
                  return accumulator + JSON.parse(currentObject['amount']);
                }, 0),
                total_monthly:rre.reduce((accumulator, currentObject) => {
                  return accumulator + JSON.parse(currentObject['amount']);
                }, 0),
                total_donation:rree.reduce((accumulator, currentObject) => {
                  return accumulator + JSON.parse(currentObject['amount']);
                }, 0),
                

                })
              }
            })
          }
        })
        //res.json(re)
      } else {
        res.json(err)
      }
      
    })
  } catch (error) {
    res.json(error)
  }
 
})
  /*****************************************************UPDATE************************************************** */
module.exports=router