import jwt from 'jsonwebtoken'
import { pool } from '../config/pool.js'

export const authMiddleware=async(req,res,next)=>{
    try {
        const authenticationData=req.headers.authorization
        if(!authenticationData){
            return res.json({success:false,message:'No token provided'})
        }
        else{
            const token=authenticationData.split(' ')[1]
            const secret=process.env.JWT_SECRET
            const enrollment=await jwt.verify(token,secret)
            
            const result = await pool.query(
                "SELECT enrollment FROM student WHERE enrollment = $1",
                [enrollment]
            );

            if (result.rows.length > 0) {
               req.user=result.rows[0]
               next()
               
            } else {
               return res.json({success:false,message:'Invalid Access'})
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}