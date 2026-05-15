import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderUser, cancelOrderUser } from "./orderService.js";

export const fetchOrder = createAsyncThunk(
  "/ord/fetchOrder",
  async (_, thunkAPI) => {
    try {
      const response = await fetchOrderUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "/ord/cancelOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await cancelOrderUser(orderData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
