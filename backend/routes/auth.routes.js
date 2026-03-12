import express from 'express'
import { pool } from '../config/pool.js'
import { generateToken } from '../config/token.js'

const authRouter=express()


authRouter.post('/signup',async(req,res)=>{
    const enrollment=req.body.enrollment
    const password=req.body.password

    if((!enrollment)||(!password)){
        return res.json({success:false,message:'Incomplete credentials'})
    }

    const result = await pool.query(
       "SELECT * FROM student WHERE enrollment = $1",
       [enrollment]
    );

    if (result.rows.length > 0) {
        return res.json({success:false,message:'This account already exists'})
    } else {
        await pool.query(
          "INSERT INTO student (enrollment, password) VALUES ($1, $2)",
          [enrollment, password]
        )
        return res.json({success:true,message:'Account created successfully'})
    }
})

authRouter.post('/login',async(req,res)=>{
    const role=req.body.role
    if(role=='student'){
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
                const token=await generateToken(enrollment)
                return res.json({success:true,message:`Login successful, token: ${token}`})
            }
        }
    } else if(role=='security'){
        // Login using credentials provided by the Admin.
    } else{
        // Single Admin. Login using Admin credentials.
    }
})

export default authRouter