import adminDashboardCaller from "../constants/adminDashboardCaller.js";

const handleAdminDashboardSecurity=async(jwt_token,route,request,email,password)=>{
    try {
        const res=await adminDashboardCaller.post(`/${route}`,
            {
                email:email,
                password:password
            },
            {
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

export default handleAdminDashboardSecurity