import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import securityRouter from './routes/security.routes.js';
import studentRouter from './routes/student.routes.js';

dotenv.config()

;(
    ()=>{
        try {
            const app=express()
            app.use(express.json())
            app.use(cors())

            app.use('/api/auth',authRouter)
            app.use('/api/admin',adminRouter)
            app.use('/api/security',securityRouter)
            app.use('/api/student',studentRouter)

            app.get('/',(req,res)=>{
                return res.json({success:true,message:'Welcome to Gate Pass App'})
            })

            const PORT=process.env.PORT
            app.listen(PORT,()=>{
                console.log(`The app is listening on PORT: ${PORT}`)
            })

        } catch (error) {
            console.log(`error: ${error.message}`)
            process.exit(1)
        }
    }
)()