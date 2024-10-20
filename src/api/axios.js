import axios from "axios";

const baseURL = process.env.REACT_APP_PRODUCTION_URL || "http://localhost:4000";
const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});
export default axiosInstance;
