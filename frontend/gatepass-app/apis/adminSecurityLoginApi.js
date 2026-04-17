import axios from 'axios'
const adminSecurityLoginApi=axios.create({
    baseURL:"http://10.52.181.185:3000/api/auth"
})

const handleAdminSecurityLogin=async(role,email,password)=>{
        try {
            const res=await adminSecurityLoginApi.post('/login',{
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