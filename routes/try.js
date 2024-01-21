
const express=require('express');
const router=express.Router();
const mysql=require('mysql')


/*
const db=mysql.createConnection({
    host:"sql11.freemysqlhosting.net",
    user:"sql11645919",
    password:"JcGHJnx5Bg",
    database:"sql11645919",
    /*connectionLimit: 50,
      queueLimit: 0,
      waitForConnection: true
    charset : 'utf8mb4_unicode_ci',*/
  //}) 

  const db=mysql.createConnection({
    host:"sql11.freemysqlhosting.net",
    user:"sql11665997",
    password:"DryhiQVTsY",
    database:"sql11665997",
    charset : 'utf8mb4',
  }) 

router.get('/',(req,res)=>{
    res.send("hello word")
})

              //registermember
router.post('/registermember',async(req,res)=>{
     

     db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber} `,(errors,resultes)=>{

          const matchPhoneNumber=resultes.map((re)=>{
            return re.phone_number;
          })
     
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
             const memberId= memberName.slice(0,2) + memberNumber.slice(8) + Math.floor(Math.random() * 1000);
             const q="INSERT INTO members_data (`name`,`father_name`,`grand_father_name`,`email`,`gender`,`campus`,`dept`,`city`,`phone_number`,`register_date`,`personal_id`,`batch`) VALUES (?)"
             const values= [req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.email,req.body.gender,req.body.campus,req.body.department,req.body.city,req.body.phoneNumber,new Date(),memberId,req.body.batch];
                  
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
                        batch:re.map((r)=>r.batch),
                        campus:re.map((r)=>r.campus),
                        dept:re.map((r)=>r.dept),
                        city:re.map((r)=>r.city),
                        phone_number:re.map((r)=>r.phone_number),
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






   


    
  

  
  })    
/****************************************************************************** */

router.post('/registermemberreg',async(req,res)=>{
     

  db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber} `,(errors,resultes)=>{
     
       const matchPhoneNumber=resultes.map((re)=>{
         return re.phone_number;
       })
      if (matchPhoneNumber==req.body.phoneNumber) {
          /****************************************** */
          db.query(`SELECT * FROM Phone_Number_List WHERE phone_number=${req.body.phoneNumber}`,(error,result)=>{
           const phoneNumberExist=result.map((re)=>{
             return re.phone_number
           })
 
           if (phoneNumberExist==req.body.phoneNumber) {
          /****************************************** */
          const q="INSERT INTO Phone_Number_List (`reg`) VALUES (?)"
          const v=['yes'];
          db.query(`SELECT * FROM Phone_Number_List WHERE phone_number =${req.body.phoneNumber} `,(err,result)=>{
                  if (result) {
                   
                      db.query(`UPDATE Phone_Number_List 
                      
                      SET reg=?
                      WHERE phone_number=${req.body.phoneNumber} `,['yes'],(err,data)=>{
                  if (data) {
                    res.json('You have successfully updated your profile')
                
                  } else {
                    res.json('try again')
                  }
                      })
                   

                  
                  } else {
                    res.json(err)
                  }
           
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









 



}) 


  /************************************************************************ */
  

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
                        email:re.map((r)=>r.email),
                        gender:re.map((r)=>r.gender),
                        batch:re.map((r)=>r.batch),
                        campus:re.map((r)=>r.campus),
                        dept:re.map((r)=>r.dept),
                        city:re.map((r)=>r.city),
                        phone_number:re.map((r)=>r.phone_number),
                        register_date:re.map((r)=>r.register_date),
    })
  })
})
  /*****************************************************UPDATE************************************************** */

     router.put(`/updatemember`,(req,res)=>{
      db.query(`UPDATE members_data 
      
      SET name=?,father_name=?,grand_father_name=?,email=?,gender=?,campus=?,dept=?,city=?,phone_number=?,batch=?
      WHERE phone_number=${req.body.phoneNumber} `,[req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.email,req.body.gender,req.body.campus,req.body.department,req.body.city,req.body.phoneNumber,req.body.batch],(err,data)=>{
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
        res.json('ok')
      }else{
        res.json('err')
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
          db.query(`SELECT * FROM members_data WHERE name LIKE '${req.params.searchText}%'`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
                        }
          })
        })

        router.get(`/searchbyphonenumber/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM members_data WHERE phone_number = ${req.params.searchText}`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
                        }
          })
        })


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
                console.log('true')
                const q="INSERT INTO P_Payment (`trn`,`amount`,`bank_name`,`personal_id`,`date_of_entry`) VALUES (?)"
              const values= [req.body.trn,req.body.amount,req.body.name_of_bank,req.body.id,new Date()];
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

              const q="INSERT INTO P_Payment (`trn`,`amount`,`bank_name`,`personal_id`,`date_of_entry`) VALUES (?)"
              const values= [req.body.trn,req.body.amount,req.body.name_of_bank,req.body.id,new Date()];
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
 router.post('/ppaymentadmin',async(req,res)=>{

  db.query(`SELECT * FROM members_data WHERE phone_number='${req.body.id}' `,(errors,resultes)=>{

           })
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
        console.log('true')
        const q="INSERT INTO P_Payment (`trn`,`amount`,`bank_name`,`personal_id`,`date_of_entry`,`approved`) VALUES (?)"
      const values= [req.body.trn,req.body.amount,req.body.name_of_bank,req.body.id,new Date(),'yes'];
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

      const q="INSERT INTO P_Payment (`trn`,`amount`,`bank_name`,`personal_id`,`date_of_entry`,`approved`) VALUES (?)"
      const values= [req.body.trn,req.body.amount,req.body.name_of_bank,req.body.id,new Date(),'yes'];
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

/******************************************************************************************************* */
/*****************************************************UPDATE************************************************** */
router.put(`/acceptaprroval/:id/:personalid`,(req,res)=>{
 try {

  db.query(`SELECT * FROM members_data WHERE personal_id='${req.params.personalid}'`,(errors,re)=>{
    const total_amount=JSON.parse(re?.map((r)=>r.total_amount_payed))
    const newAmount=JSON.parse(req.body.newAmount)
    const newTotalAmount=total_amount+newAmount
    const shares=newTotalAmount/500
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


 /* db.query(`UPDATE P_Payment 
  
  SET approved=?
  WHERE id=${req.params.id} `,['yes'],(err,data)=>{
if (data) {

res.json('You have successfully updated your profile')

} else {
res.json('try again')
}
  }) */
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
  /*****************************************************UPDATE************************************************** */
module.exports=router