import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://pkart-s4i4.onrender.com/auth',
     //baseURL: "http://192.168.29.238:3002/auth",
    withCredentials: true
}) 