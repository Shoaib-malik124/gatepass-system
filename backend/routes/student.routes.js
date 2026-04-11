import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'
import 'dotenv/config'

const studentRouter=express.Router()

studentRouter.get('/delete',authMiddleware,async(req,res)=>{
    try {
        const enrollment=req.user
        await pool.query(
            "DELETE FROM student WHERE enrollment = $1",
            [enrollment]
        );
        return res.json({success:false,message:'Account removed successfully'})
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
                return res.json({success:false,message:'Access denied,current time lesser than the minimum time'})
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
                    const expiry=curr_time-end

                    const result=await pool.query(
                        "INSERT INTO pass (enrollment,creation_time,expiry_time) values($1,$2,$3) RETURNING id",
                        [enrollment,curr_time,expiry]
                    );
                    return res.json({success:true,message:'Pass granted',tokenId:result.rows[0].id})
                }
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
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