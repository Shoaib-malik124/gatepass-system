import pkg from 'pg'
import 'dotenv/config'

const { Pool }=pkg

const pool= new Pool({
    host: "localhost",
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "gatepass",
    port: process.env.POSTGRES_PORT
})

export default pool