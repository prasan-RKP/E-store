import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signUp, checkAuthVerify, saveChange, addCart, showAddToCart, incQuantity, decQuantity } from "./authThunk.js";

const INI_STATE = {
  verfiedUser: null,
  loading: false,
  error: null,
  isCheckingAuth: true,
  isCartLoading: false,
  carts: []
};

const authSlice = createSlice({
  name: "auth",
  initialState: INI_STATE,
  extraReducers: (builder) => {
    builder

      // signup
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.verfiedUser = action.payload;
      })

      .addCase(signUp.rejected, (state, action) => {
        ((state.error = action.payload), (state.loading = false));
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.verfiedUser = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.verfiedUser = null;
        state.loading = false;
        state.error = null;
      })

      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CheckAuth
    
      .addCase(checkAuthVerify.pending, (state) => {
        state.isCheckingAuth = true;
      })

      .addCase(checkAuthVerify.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.error = null;
        state.verfiedUser = action.payload;
      })

      .addCase(checkAuthVerify.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.verfiedUser = null;
        state.error = action.payload;
      })


      // saveChnange
      
      .addCase(saveChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(saveChange.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.verfiedUser = action.payload;
      })

      .addCase(saveChange.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })


      // addCart

      .addCase(addCart.pending, (state) => {
        state.isCartLoading = true;
        state.error = null;
      })

      .addCase(addCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.error = null;
        state.carts = action.payload;
      })

      .addCase(addCart.rejected, (state, action) => {
        state.error = action.payload;
        state.isCartLoading = false;
      })


      // showAddToCart

      .addCase(showAddToCart.pending, (state) => {
        state.isCartLoading = true;
        state.error = null;
      })

      .addCase(showAddToCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.error = null;
        state.carts = action.payload;
      })

      .addCase(showAddToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.isCartLoading = false;
      })


      // incQuantity

      .addCase(incQuantity.pending, (state) => {
        state.isCartLoading = true;
        state.error = null;
      })

      .addCase(incQuantity.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.error = null;
        state.carts = action.payload;
      })

      .addCase(incQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.isCartLoading = false;
      })

      // decQuantity


      .addCase(decQuantity.pending, (state) => {
        state.isCartLoading = true;
        state.error = null;
      })

      .addCase(decQuantity.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.error = null;
        state.carts = action.payload;
      })

      .addCase(decQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.isCartLoading = false;
      })





  },
});
