import authCaller from "../constants/authCaller.js";

const handleStudentLogin=async(role,enrollment,password)=>{
    try {
        const res=await authCaller.post('/login',{
            role:role,
            enrollment:enrollment,
            password:password
        });
        return res.data
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export default handleStudentLogin