import { createSlice } from "@reduxjs/toolkit";

//  ++++++++++++  Imported Files form 'authThunk.js' ++++++++++++

import {
  login,
  logout,
  signUp,
  checkAuthVerify,
  saveChange,

  addCart,
  showAddToCart,
  incQuantity,
  decQuantity,
  deleteCartProduct,
  updateProdSize,

  productShow,

  addReview,
  fetchReview,

  addToWishList,
  showWishListItem,
  removeWishListProd,

  removeAllCartItems,
  moveToAddCart,

  fetchShippingAddress,
  saveShippingAddress1,
  saveShippingAddress2,
  checkout,
  placeOrder,

} from "./authThunk.js";

const INI_STATE = {

  verfiedUser: null,
  loading: false,
  error: null,
  isCheckingAuth: true,
  isCartLoading: false,
  isCheckoutLoading: false,
  carts: [],
  authProdDetail: null,
  reviews: [],
  wishlist: [],
};

const authSlice = createSlice({
  name: "auth",

  initialState: INI_STATE,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // ---------------- Auth ----------------

      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verfiedUser = null;
      })

      // login

      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.verfiedUser = null;
      })

      // logout

      .addCase(logout.fulfilled, (state) => {
        state.verfiedUser = null;
      })

      // checkAuth

      .addCase(checkAuthVerify.pending, (state) => {
        state.isCheckingAuth = true;
      })

      .addCase(checkAuthVerify.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.verfiedUser = action.payload;
      })

      .addCase(checkAuthVerify.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.error = action.payload;
      })

      // saveChange

      .addCase(saveChange.pending, (state) => {
        state.loading = true;
      })

      .addCase(saveChange.fulfilled, (state, action) => {
        state.loading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(saveChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- Cart ----------------

      .addCase(addCart.pending, (state) => {
        state.isCartLoading = true;
      })

      .addCase(addCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.carts = action.payload;
      })

      .addCase(addCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
      })

      // show cart

      .addCase(showAddToCart.pending, (state) => {
        state.isCartLoading = true;
      })

      .addCase(showAddToCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.carts = action.payload;
      })

      .addCase(showAddToCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
      })

      // incQuantity

      .addCase(incQuantity.pending, (state) => {
        state.isCartLoading = true;
      })

      .addCase(incQuantity.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.carts = action.payload;
      })

      .addCase(incQuantity.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
      })

      // decQuantity

      .addCase(decQuantity.pending, (state) => {
        state.isCartLoading = true;
      })

      .addCase(decQuantity.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.carts = action.payload;
      })

      .addCase(decQuantity.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
      })

      // deleteCartProduct

      .addCase(deleteCartProduct.pending, (state) => {
        state.isCartLoading = true;
      })

      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.carts = action.payload;
      })

      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
      })

      // updateProdSize

      .addCase(updateProdSize.fulfilled, (state, action) => {
        state.carts = action.payload;
      })

      // ---------------- Product ----------------

      .addCase(productShow.pending, (state) => {
        state.loading = true;
      })

      .addCase(productShow.fulfilled, (state, action) => {
        state.loading = false;
        state.authProdDetail = action.payload;
      })

      .addCase(productShow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- Review ----------------

      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })

      .addCase(fetchReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })

      // ---------------- Wishlist ----------------

      .addCase(addToWishList.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })

      .addCase(showWishListItem.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })

      .addCase(removeWishListProd.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })

      // ---------------- Cart Utilities ----------------

      .addCase(removeAllCartItems.fulfilled, (state, action) => {
        state.carts = action.payload;
      })

      .addCase(moveToAddCart.fulfilled, (state, action) => {
        state.carts = action.payload;
      })

      // ---------------- Checkout ----------------

      .addCase(fetchShippingAddress.pending, (state) => {
        state.isCheckoutLoading = true;
      })

      .addCase(fetchShippingAddress.fulfilled, (state, action) => {
        state.isCheckoutLoading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(fetchShippingAddress.rejected, (state, action) => {
        state.isCheckoutLoading = false;
        state.error = action.payload;
      })

      // saveShippingAddress1

      .addCase(saveShippingAddress1.pending, (state) => {
        state.isCheckoutLoading = true;
      })

      .addCase(saveShippingAddress1.fulfilled, (state, action) => {
        state.isCheckoutLoading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(saveShippingAddress1.rejected, (state, action) => {
        state.isCheckoutLoading = false;
        state.error = action.payload;
      })

      // saveShippingAddress2

      .addCase(saveShippingAddress2.pending, (state) => {
        state.isCheckoutLoading = true;
      })

      .addCase(saveShippingAddress2.fulfilled, (state, action) => {
        state.isCheckoutLoading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(saveShippingAddress2.rejected, (state, action) => {
        state.isCheckoutLoading = false;
        state.error = action.payload;
      })

      // checkout

      .addCase(checkout.pending, (state) => {
        state.isCheckoutLoading = true;
      })

      .addCase(checkout.fulfilled, (state, action) => {
        state.isCheckoutLoading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(checkout.rejected, (state, action) => {
        state.isCheckoutLoading = false;
        state.error = action.payload;
      })

      // placeOrder

      .addCase(placeOrder.pending, (state) => {
        state.isCheckoutLoading = true;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isCheckoutLoading = false;
        state.verfiedUser = action.payload;
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.isCheckoutLoading = false;
        state.error = action.payload;
      });

  },
});

export default authSlice.reducer;