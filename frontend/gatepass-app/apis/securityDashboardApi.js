import securityDashboardCaller from "../constants/securityDashboardCaller"

export const handleSecurityDashboard=(session,signal,id,jwt_token)=>{
    try {
        const res=securityDashboardCaller.post('/scanGatePass',
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