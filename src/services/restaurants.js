import { axiosInstance } from "../providers/axiosProvider";

export const getAllRestaurants = () => {
  return axiosInstance.get("/restaurants");
};

export const getRestaurantDetail = (id) => {
  return axiosInstance.get(`/restaurants/${id}`);
};
