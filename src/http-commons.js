import axios from "axios"

export default axios.create({
    baseURL: 'http://192.168.1.3:3005/',

    headers: {
        "Content-Type" : "application/json"
    }
})