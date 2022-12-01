import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: 'https://bowllywood.herokuapp.com/'
});