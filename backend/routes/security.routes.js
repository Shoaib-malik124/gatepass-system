import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import pool from '../config/pool.js'
import jwt from 'jsonwebtoken'

const securityRouter=express.Router()

securityRouter.post('/decodeGatepass',authMiddleware,async(req,res)=>{
    try {
        const gatepassToken=req.body.gatepassToken
        const secret=process.env.JWT_SECRET
        const decodedToken=await jwt.verify(gatepassToken,secret)
        return res.json({success:true,enrollment:decodedToken.enrollment,id:decodedToken.id})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

securityRouter.post('/scanGatePass',authMiddleware,async(req,res)=>{
    try {
        const session=req.body.session,signal=req.body.signal,id=req.body.id

        if(session=='exit'){
            if(signal=='reject'){
                await pool.query(
                    "DELETE FROM pass WHERE id = $1",
                    [id]
                );
                return res.json({success:false,message:'Gatepass rejected for exit'})
            }
            else{
                const result=await pool.query(
                    "SELECT * FROM pass WHERE id = $1",
                    [id]
                )

                if(result.rows.length==0)return res.json({success:false,message:'Gatepass already rejected'})
                
                else if(result.rows[0].scanout==true){
                    return res.json({success:false,message:'Gatepass already scanned for exit'})
                }
                else{
                    await pool.query(
                        "UPDATE pass SET exit_time=CURRENT_TIMESTAMP,scanout=TRUE WHERE id=$1",
                        [id]
                    );
                    return res.json({success:true,message:'Gatepass scan successful for exit'})
                }
            }
        }
        else{
            const result=await pool.query(
                "SELECT * FROM pass WHERE id = $1",
                [id]
            )
            if(result.rows.length==0)return res.json({success:false,message:'This gatepass was rejected for exit'})
            const enrollment=result.rows[0].enrollment

            if(signal=='accept'){
                if(result.rows[0].scanin==true){
                    return res.json({success:false,message:'Gatepass already scanned for entry'})
                }
                else{
                    await pool.query(
                        `UPDATE pass
                        SET entry_time = CURRENT_TIMESTAMP,
                        scanin=TRUE,
                        processed=TRUE
                        WHERE id = $1`,
                        [id]
                    );
                    return res.json({success:true,message:'Gatepass scan successful for entry'})
                }
            }
            else{
                return res.json({success:false,message:'Enrollment mismatch'})
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

securityRouter.post('/imposeFine',authMiddleware,async(req,res)=>{ 
    try {
        const enrollment=req.body.enrollment
        const result=await pool.query(
            "SELECT fine_rate from gatepass_rules WHERE id=$1",
            [1]
        )
        const fine=result.rows[0].fine_rate
        await pool.query(
            `UPDATE student
            SET fine=fine+ $1
            WHERE enrollment=$2`,
            [fine,enrollment]
        )
        return res.json({success:true,message:'Fine imposed successfully'})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

securityRouter.post('/processLate',authMiddleware,async(req,res)=>{ // whose token expired(beyond 23:59)
    try {
        const enrollment=req.body.enrollment
        const result=await pool.query(
            "SELECT fine_rate from gatepass_rules WHERE id=$1",
            [1]
        )
        const fine=result.rows[0].fine_rate
        await pool.query(
            "UPDATE student SET fine=fine+$1 WHERE enrollment=$2",
            [fine,enrollment]
        )
        await pool.query(
            `UPDATE pass 
            SET entry_time=CURRENT_TIMESTAMP,scanin=TRUE,processed=TRUE
            WHERE enrollment=$1 AND processed=FALSE`,
            [enrollment]
        )
        return res.json({success:true,message:'Late processing successful'})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

export default securityRouter