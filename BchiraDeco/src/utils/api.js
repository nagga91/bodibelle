import axios from "axios";

    console.log(process.env.REACT_APP_BASE_URL);
    
const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
    withCredentials: true,
});

export default api;