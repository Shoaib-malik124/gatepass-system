import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'

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

studentRouter.get('/logout',authMiddleware,async(req,res)=>{
    return res.json({success:true,message:'Logout successful'})
})

studentRouter.post('/requestPass',authMiddleware,async(req,res)=>{
    try {
        const permission=await pool.query(
            "SELECT movement_allowed FROM admin WHERE id=$1",
            [1]
        );
        if(!permission){
            return res.json({success:false,message:'Movement is restricted'})
        }
        else{
            const date=new Date()
            const time=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            const start=await pool.query(
                "SELECT start_time FROM gatepass_rules WHERE id=$1",
                [1]
            );

            if(time<start){
                return res.json({success:false,message:'Access denied'})
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
                    const date=new Date()

                    const result=await pool.query(
                        "INSERT INTO tokens (enrollment,creation time) values($1,$2) RETURNING id",
                        [enrollment,`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`]
                    );
                    return res.json({success:true,message:'Pass granted',tokenId:result.rows[0].id})
                }
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})
export default studentRouter