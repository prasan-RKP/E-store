import axios from "axios";

export const orderInstance = axios.create({
    baseURL: 'https://pkart-s4i4.onrender.com/ord',
     //baseURL: "http://192.168.29.238:3002/ord",
    withCredentials: true
})