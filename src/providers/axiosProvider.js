import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect } from 'react';
import { AuthContext } from './../contexts/AuthContext';

export const axiosInstance = axios.create({
    // baseURL: 'https://bowllywood-8llo.onrender.com'
    baseURL: 'http://localhost:5000'
});

const AxiosProvider = ({ children }) => {
    const userCxt = useContext(AuthContext);
    const { user } = userCxt;
    useEffect(() => {
      // Add a request interceptor
      axiosInstance.interceptors.request.use(
        function (config) {
        //   console.log(config)
          if (user?.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
            // console.log(config.headers);
          }
          // Do something before request is sent
          return config;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        }
      );
  
      // Add a response interceptor
      axiosInstance.interceptors.response.use(
        function (response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        },
        function (error) {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          return Promise.reject(error);
        }
      );
    }, []);
    return children;
  };
  
  export default AxiosProvider;