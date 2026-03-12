import jwt from 'jsonwebtoken'
export const generateToken=async(enrollment)=>{
    try {
        const secret=process.env.JWT_SECRET
        const token=await jwt.sign(
            {enrollment},
            secret,
            {expiresIn:'1d'}
        )
        return token
    } catch (error) {
        return 'error'
    }
}