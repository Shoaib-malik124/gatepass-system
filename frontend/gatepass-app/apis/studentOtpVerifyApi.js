import axios from "axios";
import authCaller from "../constants/authCaller.js";

const handleStudentOtpVerify=async(otp,email)=>{
    try {
        const res=await authCaller.post('/signup/verify-otp',{
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