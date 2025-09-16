import axios from "axios";

export const orderInstance = axios.create({
    baseURL: 'http://localhost:3002/ord',
     //baseURL: "http://192.168.29.238:3002/ord",
    withCredentials: true
})