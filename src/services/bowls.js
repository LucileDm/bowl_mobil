import { axiosInstance } from "../providers/axiosProvider";

export const getOneMeal = (id) => {
    return axiosInstance.get(`/menus/${id}`);
}

export const getSweetBowls = () => {
    return axiosInstance.get('/menus/desserts');
}

export const getSaltedBowls = () => {
    return axiosInstance.get('/menus/');
}