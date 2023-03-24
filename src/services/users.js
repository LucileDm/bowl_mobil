import {axiosInstance} from '../providers/axiosProvider';

export const register = (values) => {
    return axiosInstance.post('/users/add', values);
}

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
}

export const editUserProfile = (values, token) => {
    return axiosInstance.patch('/users/me', values, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}