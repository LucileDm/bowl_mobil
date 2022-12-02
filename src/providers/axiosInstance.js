import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://bowllywood.onrender.com/'
});