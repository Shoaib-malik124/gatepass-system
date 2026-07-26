import { createClient } from "redis"
import 'dotenv/config'

let client;

export const initRedis=async()=>{
    client = createClient({
      url: process.env.REDIS_URL
    });

    client.on("error", function(err) {
      console.log('Redis Error:', err);
    });
    await client.connect()
};

export const getRedis = () => client;