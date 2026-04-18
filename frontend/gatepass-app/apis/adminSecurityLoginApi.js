import axios from 'axios'
import authCaller from "../constants/authCaller.js";

const handleAdminSecurityLogin=async(role,email,password)=>{
        try {
            const res=await authCaller.post('/login',{
                role:role,
                email:email,
                password:password
            });
            return res.data
        } catch (error) {
            console.log(error.message)
            return {
                success:false,
                message:error.messaage
            }
        }
    }
export default handleAdminSecurityLogin