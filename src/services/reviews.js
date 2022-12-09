import { axiosInstance } from "../providers/axiosInstance";

export const createReview = (values) => {
    return axiosInstance.post('/reviews/create', values);
}

/*export const updateReview = (id, values) => {
    return axiosInstance.post(`/reviews/update${id}`, values);
}*/

export const getAllReview = () => {
    return axiosInstance.get('/reviews');
}

export const deleteReview = (id) => {
    return axiosInstance.delete(`/reviews/delete/${id}`);
}