import pool from "./config/pool.js";
import bcrypt from 'bcrypt'
import 'dotenv/config'

const email=process.env.ADMIN_MAIL
const password=await bcrypt.hash(process.env.ADMIN_PASSWORD,10)
await pool.query(
    "INSERT INTO admin (email,password) values($1,$2)",
    [email,password]
);