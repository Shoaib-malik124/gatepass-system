import pkg from 'pg'

const { Pool }=pkg

export const getPool=()=>{
    const pool= new Pool({
        host: "localhost",
        user: "postgres",
        password: "nitsgr1Ss@",
        database: "gatepass",
        port: 5432
    })
    return pool
}