import axios from 'axios'

const adminDashboardCaller=axios.create({
    baseURL:`${process.env.EXPO_PUBLIC_SERVER_URL}/api/admin`
})

export default adminDashboardCaller