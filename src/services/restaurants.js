import { axiosInstance } from "../providers/axiosProvider";

export const getAllRestaurants = () => {
  return axiosInstance.get("/restaurants");
};
