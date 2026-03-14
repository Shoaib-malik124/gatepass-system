import express from 'express'
import { generateToken } from '../config/token.js'
import pool from '../config/pool.js'
import bcrypt from 'bcrypt'
import { branches, perBranchRoll } from '../constants/constant.js'
import { sendOtpEmail } from '../utils/emailSender.js'
import { client } from '../config/redisConnect.js'

const authRouter=express()

const isValid=(enrollment)=>{
    if (!(/^\d{4}[A-Z]{4}\d{3}$/.test(enrollment))) {
        return false
    }
    else{
        const year=enrollment.slice(0,4)
        const degBranch=enrollment.slice(4,8)
        const roll=enrollment.slice(8,11)

        const date=new Date()
        const currentYear=date.getFullYear()
        if(!(year>=currentYear-4&&year<=currentYear)){
            return false
        }
        else if(!branches.includes(degBranch)){
            return false
        }
        else if(!(roll>='00'&&roll<=perBranchRoll[degBranch.slice(1,4)])){
            return false
        }
        else return true
    }
}

const generateOtp=()=>{
    const otp=Math.floor(100000 + Math.random() * 900000)
    return otp
}

authRouter.post('/signup/send-otp',async(req,res)=>{
    const email=req.body.email
    if(!email){
        return res.json({success:false,message:'Enter email'})
    }
    else if(!email.endsWith("@nitsri.ac.in")){
        return res.json({success:false,message:'Invalid mail'})
    }
    else{
       const otp=generateOtp()
       await client.setEx(`otp:${email}`, 300, otp)
       return res.json(sendOtpEmail(email,otp))
    }
})

authRouter.post('/signup/verify-otp',async(req,res)=>{
    const otp=req.body.otp
    if(!otp){
        return res.json({success:false,message:'No otp provided'})
    }
    else{
        const originalOtp=await client.get(`otp:${email}`)
        if(originalOtp!=otp){
           return res.json({success:false,message:'Invalid otp'})
        }
        else{
            const enrollment=req.body.enrollment
            const password=req.body.password

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
                hashedPassword=await bcrypt.hash(password,10)
                await pool.query(
                    "INSERT INTO student (enrollment, password) VALUES ($1, $2)",
                    [enrollment,hashedPassword]
                )
                return res.json({success:true,message:'Account created successfully'})
            }
        }
    }
})

authRouter.post('/login',async(req,res)=>{
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
        // Login using credentials provided by the Admin==>(email,password)
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
                const hashedPassword=result.rows[0][2]
                if(await bcrypt.compare(password,hashedPassword)){
                    const id=result.rows[0][0]
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
        // Single Admin. Login using Admin credentials.
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
                    const id=result.rows[0][0]
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
})

export default authRouter