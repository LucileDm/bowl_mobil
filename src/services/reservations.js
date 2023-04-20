import { axiosInstance } from "../providers/axiosProvider";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";

export const createReservation = (values, token) => {
    return axiosInstance.post('/reservations/create', values, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
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

export const editReservation = (id, values, token) => {
    return axiosInstance.patch(`/reservations/update/${id}`, values, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
}

export const cancelReservation = (id, token) => {
    return axiosInstance.patch(`/reservations/cancel/${id}`, {}, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
}

export const getReservationByDay = (day, status, token) => {
    return axiosInstance.get(`/reservations/day-seats/${day}/${status}`, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
}

export const getOneReservation = (id, token) => {
    return axiosInstance.get(`/reservations/${id}`, {
        headers: {
           Authorization: `Bearer ${token}`,
        }
    })
}
