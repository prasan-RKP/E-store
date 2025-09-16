import axios from "axios";

export const prodInstance = axios.create({
 baseURL: "http://localhost:3002/prod",
 // baseURL: "http://192.168.29.238:3002/prod",
  withCredentials: true,
});
