import axios from 'axios'

const studentLoginApi=axios.create({
    baseURL:"http://10.52.181.185:3000/api/auth"
})

const handleStudentLogin=async(role,enrollment,password)=>{
    try {
        const res=await studentLoginApi.post('/login',{
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