import studentDashboardCaller from "../constants/studentDashboardCaller.js";

const handleStudentDashboardPass=async(jwt_token)=>{
    try {
        const res=await studentDashboardCaller.post('/requestPass',{},{
            headers: {
                authorization: `Bearer ${jwt_token}`
            }
        });
        return res.data
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}

export default handleStudentDashboardPass