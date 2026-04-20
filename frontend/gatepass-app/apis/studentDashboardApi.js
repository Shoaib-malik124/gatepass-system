import studentDashboardCaller from "../constants/studentDashboardCaller.js";
import * as SecureStore from 'expo-secure-store';

const handleStudentDashboard=async(jwt_token,route,request)=>{
    if(request=='post'){
       try {
            const res=await studentDashboardCaller.post(`/${route}`,{},{
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
            await SecureStore.deleteItemAsync('token');
            const res=await studentDashboardCaller.get(`/${route}`,{
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

export default handleStudentDashboard