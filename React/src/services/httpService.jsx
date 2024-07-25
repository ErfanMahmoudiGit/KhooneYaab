import axios from "axios"

// const BASE_URL = "ProximityFinder/api";
const BASE_URL = "http://localhost:8000/ProximityFinder/api";

const app = axios.create({
    // config haye khodemoon ro mizrim
    baseURL: BASE_URL,
    withCredentials:true
})

const http = {
    get : app.get,
    post : app.post,
    patch : app.patch,
    put : app.put,
    delete : app.delete
}

export default http;