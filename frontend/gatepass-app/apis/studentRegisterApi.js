import axios from "axios";

const studentRegisterApi=axios.create({
    baseURL:"http://10.52.181.185:3000/api/auth"
})

const handleStudentRegister=async(enrollment,password,email)=>{
    try {
        const res=await studentRegisterApi.post('/register',{
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