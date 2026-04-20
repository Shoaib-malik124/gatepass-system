import pool from "./config/pool.js";
import bcrypt from 'bcrypt'

const email='shoaibaltaf0019@gmail.com'
const password=await bcrypt.hash('nitsgr1Ss@',10)
await pool.query(
    "INSERT INTO admin (email,password) values($1,$2)",
    [email,password]
);