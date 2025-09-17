import axios from "axios";

export const prodInstance = axios.create({
 baseURL: "https://pkart-s4i4.onrender.com/prod",
 // baseURL: "http://192.168.29.238:3002/prod",
  withCredentials: true,
});
