import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAccsUser,
  fetchingMenClothUser,
  fetchingWomenClothUser,
  fetchingFootWearUser,
} from "./prodSerivice.js";

export const fetchAccs = createAsyncThunk(
  "/prod/fetchAccess",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAccsUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchingMenCloth = createAsyncThunk(
  "/prod/fetchManCloth",
  async (_, thunkAPI) => {
    try {
      const response = await fetchingMenClothUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchingWomenCloth = createAsyncThunk(
  "/prod/fetchWomenCloth",
  async (_, thunkAPI) => {
    try {
      const response = await fetchingWomenClothUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchingFootWear = createAsyncThunk(
  "/prod/fetchFootwear",
  async (_, thunkAPI) => {
    try {
      const response = await fetchingFootWearUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
