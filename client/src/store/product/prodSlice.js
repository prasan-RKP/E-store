import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAccs,
  fetchingMenCloth,
  fetchingWomenCloth,
  fetchingFootWear,
} from "./prodThunk.js";

const initialState = {
  accessories: [],
  menClothes: [],
  womenClothes: [],
  footwear: [],

  loading: false,
  error: null,
};

const prodSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= ACCESSORIES =================

      .addCase(fetchAccs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAccs.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = action.payload;
      })

      .addCase(fetchAccs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= MEN CLOTH =================

      .addCase(fetchingMenCloth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchingMenCloth.fulfilled, (state, action) => {
        state.loading = false;
        state.menClothes = action.payload;
      })

      .addCase(fetchingMenCloth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= WOMEN CLOTH =================

      .addCase(fetchingWomenCloth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchingWomenCloth.fulfilled, (state, action) => {
        state.loading = false;
        state.womenClothes = action.payload;
      })

      .addCase(fetchingWomenCloth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= FOOTWEAR =================

      .addCase(fetchingFootWear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchingFootWear.fulfilled, (state, action) => {
        state.loading = false;
        state.footwear = action.payload;
      })

      .addCase(fetchingFootWear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError } = prodSlice.actions;

export default prodSlice.reducer;