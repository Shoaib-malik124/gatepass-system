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
        const enrollment=req.user
        const passResponse = await pool.query(
            `SELECT * FROM pass
            WHERE enrollment = $1
            AND processed = FALSE`,
            [enrollment]
        );

        if(passResponse.rows.length===0){
            const permissionResult=await pool.query(
                "SELECT permission FROM gatepass_rules WHERE id=$1",
                [1]
            );
            const permission=permissionResult.rows[0].permission

            if(!permission){
                return res.json({success:false,message:'Movement is restricted'})
            }
            else{
                const result=await pool.query(
                    "SELECT min_time,max_time FROM gatepass_rules WHERE id=$1",
                    [1]
                );

                const date=new Date()
                const start_time_string=result.rows[0].min_time,end_time_string=result.rows[0].max_time

                const [sh,sm,ss]=start_time_string.split(':').map(Number)
                const [eh,em,es]=end_time_string.split(':').map(Number)
                const ch=date.getHours(),cm=date.getMinutes(),cs=date.getSeconds()

                const startSec=sh*60*60+sm*60+ss,endSec=eh*60*60+em*60+es,currSec=ch*60*60+cm*60+cs

                if(currSec<startSec || currSec>=endSec){
                   return res.json({success:false,message:'Access denied,current time not allowed for exit'})
                }

                else{
                    const fineResult=await pool.query(
                        "SELECT fine FROM student WHERE enrollment=$1",
                        [enrollment]
                    )
                    const fine=fineResult.rows[0].fine
                    const maxAllowedFine=process.env.MAX_FINE
                    if(fine>=maxAllowedFine){
                        return res.json({success:false,message:'Fine overdue'})
                    }
                    else{
                        const expiry=new Date(
                            date.getFullYear(),  
                            date.getMonth(),    
                            date.getDate(),      
                            eh,              
                            em,            
                            es
                        );

                        const result=await pool.query(
                            "INSERT INTO pass (enrollment,expiry_time) values($1,$2) RETURNING id",
                            [enrollment,expiry]
                        );

                        const tokenPayload={
                            id:result.rows[0].id,
                            enrollment:enrollment
                        }

                        const validity=new Date(
                            date.getFullYear(),  
                            date.getMonth(),    
                            date.getDate(),      
                            23,              
                            59,            
                            59
                        )

                        const tokenExpiry=(validity.getTime()-Date.now())
                        
                        const secret=process.env.JWT_SECRET
                        const token=await jwt.sign(tokenPayload,secret,{expiresIn:tokenExpiry})

                        return res.json({success:true,message:'Pass granted',token:token})
                    }
                }
            }
        }
        else{
            return res.json({success:false,message:'Gatepass already provided'})
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
       AND processed = FALSE`,
      [enrollment]
    );

    if (result.rows.length > 0) {
      const tokenPayload={
        id:result.rows[0].id,
        enrollment:enrollment
      }

      const tokenExpiry=(result.rows[0].expiry_time.getTime()-Date.now())
      const secret=process.env.JWT_SECRET

      const token=jwt.sign(tokenPayload,secret,{expiresIn:tokenExpiry})

      return res.json({
        success:true,
        gatepass:token
      })
    } else {
      return res.json({
        success:false,
      })
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success:false });
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