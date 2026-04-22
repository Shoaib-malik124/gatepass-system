import adminDashboardCaller from "../constants/adminDashboardCaller"

const handleRulesSet=async(jwt_token,permission,start,end,fine)=>{
   try {
      const res=await adminDashboardCaller.post('/setRules',
         {
            movement:permission,
            start:start,
            end:end,
            fine:fine
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

export default handleRulesSet