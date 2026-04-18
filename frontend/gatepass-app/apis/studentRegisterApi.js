import axios from "axios";
import authCaller from "../constants/authCaller.js";

const handleStudentRegister=async(enrollment,password,email)=>{
    try {
        const res=await authCaller.post('/register',{
           enrollment:enrollment,
           password:password,
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

export default handleStudentRegister