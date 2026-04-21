import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'
import bcrypt from 'bcrypt'
import { sendSecurityMail } from '../utils/emailSender.js'

const adminRouter=express.Router()

adminRouter.get('/delete',authMiddleware,async(req,res)=>{
    try {
        const id=req.user
        await pool.query(
            "DELETE FROM admin WHERE id=$1",
            [id]
        )
        return res.json({success:true,message:'Account deleted successfully'})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

adminRouter.post('/addSecurity',authMiddleware,async(req,res)=>{
    try {
        const email=req.body.email
        const password=req.body.password
        if((!email)||(!password)){
            return res.json({success:false,message:'Incomplete credentials'})
        }
        else{
            const result=await pool.query(
               "SELECT * FROM security WHERE email=$1",
               [email]
            );
            if(result.rows.length>0){
                return res.json({success:false,message:'This email is already in use'})
            }
            else{
                const hashedPassword=await bcrypt.hash(password,10)
                await pool.query(
                   "INSERT INTO security (email, password) VALUES ($1, $2)",
                    [email,hashedPassword]
                );
                const response=await sendSecurityMail(email,password)
                return res.json(response)
            }
        }

    } catch (error) {
        // If account was created but mail send failed, then delete the security account.
        return res.json({success:false,message:error.message})
    }
})

adminRouter.post('/removeSecurity',authMiddleware,async(req,res)=>{
    try {
        const email=req.body.email
        if(!email){
            return res.json({success:false,message:'No email provided'})
        }
        else{
            await pool.query(
                "DELETE FROM security WHERE email = $1",
                [email]
            );
            return res.json({success:true,message:'Security account deleted successfully'})
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

adminRouter.post('/setRules',authMiddleware,async(req,res)=>{
    try {
      let {movement,start,end,fine}=req.body
      const response=await pool.query(
        "SELECT permission,min_time,max_time,fine_rate FROM gatepass_rules WHERE id= $1",
        [1]
      );

      if(!movement)movement=response.rows[0].permission
      if(!start)start=response.rows[0].min_time
      if(!end)end=response.rows[0].max_time
      if(!fine)fine=response.rows[0].fine_rate

      await pool.query(
        "UPDATE gatepass_rules SET permission=$1,min_time=$2,max_time=$3,fine_rate=$4 WHERE id=$5",
        [movement,start,end,fine,1]
      )

      return res.json({success:true,message:'Gatepass rules updated successfully'})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

export default adminRouter