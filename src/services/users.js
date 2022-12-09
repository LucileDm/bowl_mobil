import {axiosInstance} from '../providers/axiosProvider';

export const register = (values) => {
    return axiosInstance.post('/users/add', values);
}

export const login = (values) => {
    return axiosInstance.post('/users/login', values);
}

export const getUserDetails = (id) => {
    return axiosInstance.get('/users/' + id);
}