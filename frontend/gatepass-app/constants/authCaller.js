import axios from 'axios'
let url=process.env.EXPO_PUBLIC_SERVER_URL

const authCaller=axios.create({
    baseURL:`${url}/api/auth`
})

export default authCaller