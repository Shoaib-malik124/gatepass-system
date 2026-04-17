import express from 'express'
import { generateToken } from '../utils/token.js'
import pool from '../config/pool.js'
import bcrypt from 'bcrypt'
import { branches, perBranchRoll } from '../constants/constant.js'
import { sendOtpEmail } from '../utils/emailSender.js'
import { getRedis }  from '../config/redisConnect.js'

const authRouter=express.Router()

const isValid = (enrollment) => {
    if (!(/^\d{4}[A-Z]{4}\d{3}$/.test(enrollment))) {
        return false
    }

    const year = parseInt(enrollment.slice(0, 4), 10)
    const degBranch = enrollment.slice(4, 8)
    const roll = parseInt(enrollment.slice(8, 11), 10)

    const currentYear = new Date().getFullYear()

    if (!(year >= currentYear - 4 && year <= currentYear)) {
        return false
    }

    if (!branches.includes(degBranch)) {
        return false
    }

    if (!(roll >= 1 && roll <= perBranchRoll[degBranch])) {
        return false
    }

    return true
}

const generateOtp=()=>{
    const otp=Math.floor(100000 + Math.random() * 900000)
    return otp
}

authRouter.post('/signup/send-otp',async(req,res)=>{
    try {
        const email=req.body.email
        if(!email){
            return res.json({success:false,message:'Enter email'})
        }
        else if(!email.endsWith("@nitsri.ac.in")){
            return res.json({success:false,message:'Invalid mail'})
        }
        else{
            const otp=generateOtp()
            const client=getRedis()
            await client.setEx(`otp:${email}`, 300, otp.toString())
            return res.json(await sendOtpEmail(email,otp))
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

authRouter.post('/signup/verify-otp',async(req,res)=>{
    try {
        const otp=req.body.otp
        const email=req.body.email
        if(!otp){
            return res.json({success:false,message:'No otp provided'})
        }
        else{
            const client=getRedis()
            const originalOtp=await client.get(`otp:${email}`)
            if(originalOtp!=otp.toString()){
                return res.json({success:false,message:'Invalid otp'})
            }
            else{
                return res.json({success:true,message:'Access granted'})
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

authRouter.post('/register',async(req,res)=>{
    try {
        const enrollment=req.body.enrollment
        const password=req.body.password
        const email=req.body.email

        if((!enrollment)||(!password)){
            return res.json({success:false,message:'Incomplete credentials'})
        }
        
        else if(!isValid(enrollment)){
            return res.json({success:false,message:'Invalid enrollment'})
        }

        const result = await pool.query(
            "SELECT * FROM student WHERE enrollment = $1",
            [enrollment]
        );

        if (result.rows.length > 0) {
            return res.json({success:false,message:'This account already exists'})
        } else {
            const hashedPassword=await bcrypt.hash(password,10)
            await pool.query(
                "INSERT INTO student (enrollment,password,collegemail) VALUES ($1, $2, $3)",
                [enrollment,hashedPassword,email]
            )
            return res.json({success:true,message:'Account created successfully'})
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

authRouter.post('/login',async(req,res)=>{
    try {
        const role=req.body.role
        if(!role){
            return res.json({success:false,message:"Select role"})
        }
        else if(role=='student'){
            const enrollment=req.body.enrollment
            const password=req.body.password
            if((!enrollment)||(!password)){
                return res.json({success:false,message:'Missing Credentials'})
            }
            else{
                const result=await pool.query(
                    "SELECT * FROM student WHERE enrollment = $1",
                    [enrollment]
                );
                
                if(result.rows.length==0){
                    return res.json({success:false,message:'This account does not exist'})
                }
                else{
                    const hashedPassword=result.rows[0][2]
                    if(await bcrypt.compare(password,hashedPassword)){
                        const token=await generateToken(enrollment)
                        return res.json({success:true,message:`Login successful, token: ${token}`})
                    }
                    else{
                        return res.json({success:false,message:'Password is not matching'})
                    }
                }
            }
        } else if(role=='security'){
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
                    const hashedPassword=result.rows[0].password
                    if(await bcrypt.compare(password,hashedPassword)){
                        const id=result.rows[0].id
                        const token=generateToken(id)
                        return res.json({success:true,message:'Login Successful',token:token})
                    }
                    else{
                        return res.json({success:false,message:'Invalid Password'})
                    }
                }
                else{
                    return res.json({success:false,message:'Invalid email'})
                }
            }
        } else{
            const email=req.body.email
            const password=req.body.password
            if((!email)||(!password)){
                return res.json({success:false,message:'Incomplete credentials'})
            }
            else{
                const result=await pool.query(
                "SELECT * FROM admin WHERE email=$1",
                [email]
                );
                if(result.rows.length>0){
                    const hashedPassword=result.rows[0][2]
                    if(await bcrypt.compare(password,hashedPassword)){
                        const id=result.rows[0].id
                        const token=generateToken(id)
                        return res.json({success:true,message:'Login Successful',token:token})
                    }
                    else{
                        return res.json({success:false,message:'Invalid Password'})
                    }
                }
                else{
                    return res.json({success:false,message:'Invalid email'})
                }
            }
        }
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

export default authRouter