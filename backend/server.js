import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getPool } from './config/db';

dotenv.config()

;(
    ()=>{
        try {
            const app=express()
            app.use(express.json())
            app.use(cors)

            const PORT=process.env.PORT
            app.listen(PORT,()=>{
                console.log(`The app is listening on PORT: ${PORT}`)
            })
            pool=getPool()
        } catch (error) {
            console.log(`error: ${error.message}`)
            process.exit(1)
        }
    }
)()