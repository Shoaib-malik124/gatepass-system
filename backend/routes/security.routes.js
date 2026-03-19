import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'

const securityRouter=express.Router()

securityRouter.post('/scanToken',authMiddleware,async(req,res)=>{
    try {
        const tokenId=req.body.tokenId
        if(!tokenId){
            return res.json({success:false,message:'No tokenId provided'})
        }
        else{
            const result=await pool.query(
                "SELECT * FROM tokens WHERE id=$1",
                [tokenId]
            );
            if(result.rows.length==0){
                return res.json({success:false,message:'No token found'})
            }
            else{
                return res.json({success:true,enrollment:result.rows[0].enrollment})
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

securityRouter.post('/allocateToken',authMiddleware,async(req,res)=>{
    try {
        const tokenId=req.body.tokenId
        if(!tokenId){
            return res.json({success:false,message:'No tokenId provided'})
        }
        else{
            const result=await pool.query(
                "SELECT * FROM tokens WHERE id=$1",
                [tokenId]
            );
            if(result.rows.length==0){
                return res.json({success:false,message:'Invalid tokenId'})
            }
            else{
                const expiry=pool.query(
                    "SELECT end_time FROM gatepass_rules WHERE id=$1",
                    [1]
                );
                await pool.query(
                    "UPDATE tokens SET expiry=$1 WHERE id = $2",
                    [expiry,tokenId]
                );
                return res.json({success:true,message:'Access granted'})
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

securityRouter.post('/reScanToken',authMiddleware,async(req,res)=>{
    try {
        const tokenId=req.body.tokenId
        if(!tokenId){
            return res.json({success:false,message:'No tokenId provided'})
        }
        else{
            const result=await pool.query(
                "SELECT * FROM tokens WHERE id=$1",
                [tokenId]
            );
            if(result.rows.length==0){
                return res.json({success:false,message:'Invalid tokenId'})
            }
            else{
                const expiry=pool.query(
                    "SELECT end_time FROM gatepass_rules WHERE id=$1",
                    [1]
                );
                const date=new Date()
                const current=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

                const result=await pool.query(
                   "SELECT * FROM tokens WHERE id=$1",
                   [tokenId]
                );

                if(current>expiry){
                    // Impose fine
                    const enrollment=result.rows[0].enrollment
                    
                }
                else{

                }
                await pool.query(
                    "UPDATE tokens SET completion time=$1 WHERE id = $2",
                    [current,tokenId]
                );
                return res.json({success:true,message:'Access granted'})
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

export default securityRouter