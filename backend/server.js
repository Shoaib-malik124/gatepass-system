import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { initRedis } from './config/redisConnect.js';
import authRouter from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import securityRouter from './routes/security.routes.js';
import studentRouter from './routes/student.routes.js';
import { limit } from './middleware/limit.js';

;(
    async()=>{
        try {
            const app=express()
            app.use(express.json())
            app.use(cors())
            app.use(limit)

            app.use('/api/auth',authRouter)
            app.use('/api/admin',adminRouter)
            app.use('/api/security',securityRouter)
            app.use('/api/student',studentRouter)

            app.get('/',(req,res)=>{
                return res.json({success:true,message:'Welcome to Gate Pass App'})
            })
            
            const PORT=process.env.PORT
            await initRedis()
            app.listen(PORT,"0.0.0.0",()=>{
                console.log(`The app is listening on PORT: ${PORT}`)
            })

        } catch (error) {
            console.log(`error: ${error.message}`)
            process.exit(1)
        }
    }
)()