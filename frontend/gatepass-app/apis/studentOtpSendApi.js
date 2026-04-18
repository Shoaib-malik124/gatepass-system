import axios from 'axios'
import authCaller from "../constants/authCaller.js";

const handleStudentOtpSend=async(email)=>{
    try {
        const res=await authCaller.post('/signup/send-otp',{
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

export default handleStudentOtpSend