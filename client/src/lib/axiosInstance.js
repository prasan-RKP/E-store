import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/auth',
    // baseURL: "http://192.168.3.238:3002/auth",
    withCredentials: true
}) 