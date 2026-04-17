import axios from "axios";

const studentOtpVerifyApi=axios.create({
    baseURL:"http://10.52.181.185:3000/api/auth"
})

const handleStudentOtpVerify=async(otp,email)=>{
    try {
        const res=await studentOtpVerifyApi.post('/signup/verify-otp',{
            otp:otp,
            email:email
        })
        return res.data
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export default handleStudentOtpVerify