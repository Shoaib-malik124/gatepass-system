import securityDashboardCaller from "../constants/securityDashboardCaller.js"

export const handleSecurityDashboard=async({session=null,signal='',id='',jwt_token,route,gatepassToken=null})=>{
    if(gatepassToken){
        try {
            const res=await securityDashboardCaller.post(`/${route}`,
                {
                  gatepassToken:gatepassToken
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
    else{
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
}