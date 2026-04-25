import axios from 'axios'

let url=process.env.EXPO_PUBLIC_SERVER_URL

const securityDashboardCaller=axios.create({
    baseURL=`${url}/api/security`
})

export default securityDashboardCaller