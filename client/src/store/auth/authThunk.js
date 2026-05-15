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
  deleteCartProductUser,
  productShowUser,
  updateProdSizeUser,
  addReviewUser,
  fetchReviewUser,
  addWishListUser,
  showWishListUser,
  removeWishListUser,
  removeAllCartItemUser,
  moveToCartUser,
  fetchShippingAddressUser,
  saveShippingAddress1User,
  saveShippingAddress2User,
  checkoutUser,
  placeOrderUser
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

export const deleteCartProduct = createAsyncThunk(
  "/auth/removeCartProduct",
  async (cartData, thunkAPI) => {
    try {
      const response = await deleteCartProductUser(cartData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

// id  route
export const productShow = createAsyncThunk(
  "/auth/prodDisplay",
  async (cartData, thunkAPI) => {
    try {
      const response = await productShowUser(cartData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const updateProdSize = createAsyncThunk(
  "/auth/updateSize",
  async (cartData, thunkAPI) => {
    try {
      const response = await updateProdSizeUser(cartData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const addReview = createAsyncThunk(
  "/auth/postReview",
  async (reviewData, thunkAPI) => {
    try {
      const response = await addReviewUser(reviewData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

// id route
export const fetchReview = createAsyncThunk(
  "/auth/fetchReview",
  async (reviewData, thunkAPI) => {
    try {
      const response = await fetchReviewUser(reviewData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const addToWishList = createAsyncThunk(
  "/auth/addWishlistProd",
  async (wishlistData, thunkAPI) => {
    try {
      const response = await addWishListUser(wishlistData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const showWishListItem = createAsyncThunk(
  "/auth/showWishlist",
  async (wishlistData, thunkAPI) => {
    try {
      const response = await showWishListUser(wishlistData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const removeWishListProd = createAsyncThunk(
  "/auth/removeWishProd",
  async (wishlistData, thunkAPI) => {
    try {
      const response = await removeWishListUser(wishlistData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const removeAllCartItems = createAsyncThunk(
  "/auth/removeAllCartItem",
  async (cartData, thunkAPI) => {
    try {
      const response = await removeAllCartItemUser(cartData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);

export const moveToAddCart = createAsyncThunk(
  "/auth/moveToCart",
  async (cartData, thunkAPI) => {
    try {
      const response = await moveToCartUser(cartData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error?.message,
      );
    }
  },
);


// --------- from other source code --------
// ---- *********** -----------
// Fetch shipping address
export const fetchShippingAddress = createAsyncThunk(
  "/auth/fetchShippingAddress",

  async (_, thunkAPI) => {

    try {

      return await fetchShippingAddressUser();

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

// Save shipping address step-1
export const saveShippingAddress1 = createAsyncThunk(
  "/auth/saveShippingAddress1",

  async (data, thunkAPI) => {

    try {

      return await saveShippingAddress1User(data);

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

// Save shipping address step-2
export const saveShippingAddress2 = createAsyncThunk(
  "/auth/saveShippingAddress2",

  async (data, thunkAPI) => {

    try {

      return await saveShippingAddress2User(data);

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

// Checkout
export const checkout = createAsyncThunk(
  "/auth/checkout",

  async (_, thunkAPI) => {

    try {

      return await checkoutUser();

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);

// Place order
export const placeOrder = createAsyncThunk(
  "/auth/placeOrder",

  async (data, thunkAPI) => {

    try {

      return await placeOrderUser(data);

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);


