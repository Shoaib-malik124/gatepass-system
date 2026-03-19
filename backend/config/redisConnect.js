import { createClient } from 'redis';

let client;

export const initRedis = async () => {
    client = createClient({
        username: process.env.CLIENT_USERNAME,
        password: process.env.CLIENT_PASSWORD,
        socket: {
            host: process.env.CLIENT_HOST,
            port: process.env.CLIENT_PORT,
        }
    });

    client.on('error', err => console.log('Redis Error:', err));

    await client.connect();
};

export const getRedis = () => client;