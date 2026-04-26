import securityDashboardCaller from "../constants/securityDashboardCaller"

export const handleSecurityDashboard=async(session=null,signal='',id='',jwt_token,route)=>{
    try {
        const res=await securityDashboardCaller.post(`/${route}`,
            {
              session:session,
              signal:signal,
              id:id
            },
            {
              headers:{
                authorization:`Bearer ${jwt_token}`
              }
            }
        )
        return res.data
    } catch (error) {
        return {
            success:false,
            message:error.message
        }
    }
}