import rateLimit from 'express-rate-limit';

export const limit=rateLimit({
    windowMs:24*60*60*1000,
    max:100,
    message:{
        success:false,
        message:"Too many requests,check tommorow"
    },
    standardHeaders:true,
    legacyHeaders:false
})