import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  checkAuthUser,
  logoutUser,
  saveChangeUser,
  addCartUser,
  showAddToCartUser,
  incQuantityUser,
  decQuantityUser,
} from "../auth/authService.js";

export const signUp = createAsyncThunk(
  "/auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const login = createAsyncThunk(
  "/auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const checkAuthVerify = createAsyncThunk(
  "/auth/check",
  async (_, thunkAPI) => {
    try {
      const response = await checkAuthUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});

export const saveChange = createAsyncThunk(
  "/auth/saveChange",
  async (userData, thunkAPI) => {
    try {
      let response = await saveChangeUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// -----  Cart Features will go here ------

export const addCart = createAsyncThunk(
  "/auth/addCartData",
  async (userData, thunkAPI) => {
    try {
      let response = await addCartUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const showAddToCart = createAsyncThunk(
  "/auth/showAddToCart",
  async (_, thunkAPI) => {
    try {
      const response = await showAddToCartUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const incQuantity = createAsyncThunk(
  "/auth/incQuantity",
  async (userData, thunkAPI) => {
    try {
      const response = await incQuantityUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const decQuantity = createAsyncThunk(
  "/auth/decQuantity",
  async (userData, thunkAPI) => {
    try {
      const response = await decQuantityUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
