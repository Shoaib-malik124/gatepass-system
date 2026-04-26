import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const studentRouter=express.Router()

studentRouter.get('/delete',authMiddleware,async(req,res)=>{
    try {
        const enrollment=req.user
        await pool.query(
            "DELETE FROM student WHERE enrollment = $1",
            [enrollment]
        );
        return res.json({success:true,message:'Account removed successfully'})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

studentRouter.post('/requestPass',authMiddleware,async(req,res)=>{
    try {
        const permission=await pool.query(
            "SELECT permission FROM gatepass_rules WHERE id=$1",
            [1]
        );
        if(!permission){
            return res.json({success:false,message:'Movement is restricted'})
        }
        else{
            const date=new Date()
            const curr_time=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const result=await pool.query(
                "SELECT min_time,max_time FROM gatepass_rules WHERE id=$1",
                [1]
            );
            const start=result.rows[0].min_time,end=result.rows[0].max_time

            if(curr_time<start||curr_time>=end){
                return res.json({success:false,message:'Access denied,current time not allowed for exit'})
            }
            
            else{
                const enrollment=req.user
                const fine=await pool.query(
                    "SELECT fine FROM student WHERE enrollment=$1",
                    [enrollment]
                )
                if(fine>=process.env.MAX_FINE){
                    return res.json({success:false,message:'Fine overdue'})
                }
                else{
                    const [hours,minutes,seconds]=end.split(':').map(Number)
                    const expiry = new Date(
                        now.getFullYear(),  
                        now.getMonth(),    
                        now.getDate(),      
                        hours,              
                        minutes,            
                        seconds 
                    );

                    const result=await pool.query(
                        "INSERT INTO pass (enrollment,expiry_time) values($1,$2) RETURNING id",
                        [enrollment,expiry]
                    );

                    const tokenPayload={
                        id:result.rows[0].id,
                        enrollment:enrollment
                    }

                    const tokenExpiry=(expiry.getTime()-Date.now())/(1000*60*60)
                    
                    const secret=process.env.JWT_SECRET
                    const token=await jwt.sign(tokenPayload,secret,{expiresIn:tokenExpiry})

                    return res.json({success:true,message:'Pass granted',token:token})
                }
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

studentRouter.get('/checkPass',authMiddleware,async(req,res)=>{
   try {
    const enrollment=req.user
    const result = await pool.query(
      `SELECT * FROM pass
       WHERE enrollment = $1
       AND processed = false
       AND expiry_time > NOW()`,
      [enrollment]
    );

    if (result.rows.length > 0) {
      return res.json({
        success:true,
        hasPass:true
      })
    } else {
      return res.json({
        success:true,
        hasPass:false
      })
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success:false,hasPass: false });
  }
})

studentRouter.post('/payFine',authMiddleware,async(req,res)=>{
    try {
        // Payment Gateway
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})
export default studentRouter