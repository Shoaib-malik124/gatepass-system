import axios from "axios";

let url=process.env.EXPO_PUBLIC_SERVER_URL

const studentDashboardCaller=axios.create({
    baseURL:`${url}/api/student`
})

// code another caller for payFine.

export default studentDashboardCaller