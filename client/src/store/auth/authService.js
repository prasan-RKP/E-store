import {axiosInstance} from "../../lib/axiosInstance.js";

export const signupUser = async(userData) => {
    const response = await axiosInstance.post("/signup", userData);
    return response.data;
}

export const loginUser = async(userData) => {
    const response = await axiosInstance.post("/login", userData);
    return response.data;
}


export const checkAuthUser = async () => {
    const response = await axiosInstance.get("/check");
    return response.data;
}

export const logoutUser = async () => {
    const response = await axiosInstance.post("/logout");
    return response.data;
}

export const saveChangeUser = async(userData) => {
    const response = await axiosInstance.put("/saveChange", userData);
    return response.data;
}

// ---- cart Logic goes here ------

export const addCartUser = async(userData) => {
    const response = await axiosInstance.post("/addCartData", userData);
    return response.data;
}

export const showAddToCartUser = async() => {
    const response = await axiosInstance.get("/showAddToCart");
     return response.data;
}

export const incQuantityUser = async(userData) => {
    const response = await axiosInstance.patch("/incQuantity", userData);
    return response.data;
}

export const decQuantityUser = async(userData) => {
    const response = await axiosInstance.patch("/decQuantity", userData);
    return response.data;
}