import axios from 'axios'
const adminSecurityLoginApi=axios.create({
    baseURL:"http://10.52.181.185:3000/api/auth"
})
export default adminSecurityLoginApi