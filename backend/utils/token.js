import jwt from 'jsonwebtoken'
export const generateToken=async(id)=>{
    try {
        const secret=process.env.JWT_SECRET
        const token=await jwt.sign(
            {id},
            secret,
            {expiresIn:'1d'}
        )
        return token
    } catch (error) {
        return 'error'
    }
}