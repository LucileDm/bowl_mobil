import { axiosInstance } from "../providers/axiosProvider";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";

export const createReservation = (values) => {
    return axiosInstance.post('/reservations/create', values);
}

export const getAllReservations = (day) => {
    return axiosInstance.get(`/reservations/admin-list/${day}`);
}

export const getUserReservations = (token) => {
    return axiosInstance.get('/reservations/', {
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
}
export const editReservation = (id, values) => {
    return axiosInstance.patch(`/reservations/update/${id}`, values);
}

export const cancelReservation = (id, token) => {
    return axiosInstance.patch(`/reservations/cancel/${id}`, {}, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
}

export const getReservationByDay = (day, status) => {
    return axiosInstance.get(`/reservations/day-seats/${day}/${status}`)
}

export const getOneReservation = (id) => {
    return axiosInstance.get(`/reservations/${id}`);
}
