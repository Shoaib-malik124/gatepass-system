import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authMiddleware=async(req,res,next)=>{
    try {
        const authenticationData=req.headers?.authorization
        if(!authenticationData){
            return res.json({success:false,message:'No token provided'})
        }
        else{
            const token=authenticationData.split(' ')[1]
            const secret=process.env.JWT_SECRET
            const decodedToken=await jwt.verify(token,secret)
            
            req.user=decodedToken.id
            next()
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}