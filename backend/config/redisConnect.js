import { createClient } from 'redis';

const connectRedis=async()=>{
    const client = createClient({
        username: process.env.CLIENT_USERNAME,
        password: process.env.CLIENT_PASSWORD,
        socket: {
            host: process.env.CLIENT_HOST,
            port: process.env.CLIENT_PORT
        }
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    return client
}

export const client=connectRedis()