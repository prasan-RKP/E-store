import axios from "axios";

export const orderInstance = axios.create({
    baseURL: 'http://localhost:3002/ord',
    // baseURL: "http://192.168.3.238:3002/auth",
    withCredentials: true
})