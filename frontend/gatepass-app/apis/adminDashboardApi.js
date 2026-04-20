import adminDashboardCaller from "../constants/adminDashboardCaller.js";
import * as SecureStore from 'expo-secure-store';

const handleAdminDashboard=async(jwt_token,route,request)=>{
    if(request=='post'){
       try {
            const res=await adminDashboardCaller.post(`/${route}`,{},{
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
    else if(request=='get'){
        try {
            const res=await adminDashboardCaller.get(`/${route}`,{
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
}

export default handleAdminDashboard