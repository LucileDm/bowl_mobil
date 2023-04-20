import { axiosInstance } from "../providers/axiosProvider";

export const getOneStock = (id) => {
   return axiosInstance.get(`/stocks/${id}`);
}

export const getAllStocks = () => {
   return axiosInstance.get('/stocks');
}