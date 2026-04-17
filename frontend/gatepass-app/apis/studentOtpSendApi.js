import axios from 'axios'

const studentOtpSendApi=axios.create({
    baseURL:"http://10.52.181.185:3000/api/auth"
})

const handleStudentOtpSend=async(email)=>{
    try {
        const res=await studentOtpSendApi.post('/signup/send-otp',{
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