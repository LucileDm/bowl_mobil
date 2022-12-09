import {axiosInstance} from '../providers/axiosProvider';

export const register = (values) => {
    return axiosInstance.post('/users/add', values);
}

<<<<<<< HEAD
export const login = async (values) => {
    return await axiosInstance.post('/users/login', values);
}

export const getUserProfile = async (token) => {
    return await axiosInstance.get(`/users/me`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then(
        res => res.data
    );
=======
export const login = (values) => {
    return axiosInstance.post('/users/login', values);
}

export const getUserDetails = (id) => {
    return axiosInstance.get('/users/' + id);
>>>>>>> dev
}