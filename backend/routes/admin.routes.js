import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'
import bcrypt from 'bcrypt'
import { sendSecurityMail } from '../utils/emailSender.js'

const adminRouter=express.Router()

adminRouter.post('/toggleMovement',authMiddleware,async(req,res)=>{
    try {
        await pool.query(
            "UPDATE gatepass_rules SET permission = NOT permission WHERE id = $1",
            [1]
        );
        return res.json({success:true,message:'Permission toggle successful'})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

adminRouter.post('/changeStart',authMiddleware,async(req,res)=>{
    try {
        const newStart=req.body.start
        if(!newStart){
            return res.json({success:false,message:'No start time provided'})
        }
        else{
            await pool.query(
                "UPDATE gatepass_rules SET min_time=$1 WHERE id=$2",
                [newStart,1]
            );
            return res.json({success:true,message:'Start time change successfull'})
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

adminRouter.post('/changeEnd',authMiddleware,async(req,res)=>{
    try {
        const newEnd=req.body.end
        if(!newEnd){
            return res.json({success:false,message:'No end time provided'})
        }
        else{
            await pool.query(
                "UPDATE gatepass_rules SET max_time=$1 WHERE id=$2",
                [newEnd,1]
            )
        }
        return res.json({success:true,message:'end time change successfull'})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

adminRouter.post('/changeFine',authMiddleware,async(req,res)=>{
    try {
        const newFine=req.body.fine
        if(!newFine){
            return res.json({success:false,message:'No fine amount provided'})
        }
        else{
            await pool.query(
                "UPDATE gatepass_rules SET fine_rate=$1 WHERE id=$2",
                [newFine,1]
            )
        }
        return res.json({success:true,message:'Fine amount change successfull'})
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
                return res.json(await sendSecurityMail(email,password))
            }
        }

    } catch (error) {
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

export default adminRouter