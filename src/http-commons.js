import axios from "axios"

export default axios.create({
    baseURL: 'http://202.157.184.138:3005/',

    headers: {
        "Content-Type" : "application/json"
    }
})