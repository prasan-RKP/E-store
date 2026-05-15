import { axiosInstance } from "../../lib/axiosInstance.js";

export const signupUser = async (userData) => {
  const response = await axiosInstance.post("/signup", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};

export const checkAuthUser = async () => {
  const response = await axiosInstance.get("/check");
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/logout");
  return response.data;
};

export const saveChangeUser = async (userData) => {
  const response = await axiosInstance.put("/saveChange", userData);
  return response.data;
};

// ---- cart Logic goes here ------

export const addCartUser = async (userData) => {
  const response = await axiosInstance.post("/addCartData", userData);
  return response.data;
};

export const showAddToCartUser = async () => {
  const response = await axiosInstance.get("/showAddToCart");
  return response.data;
};

export const incQuantityUser = async (userData) => {
  const response = await axiosInstance.patch("/incQuantity", userData);
  return response.data;
};

export const decQuantityUser = async (userData) => {
  const response = await axiosInstance.patch("/decQuantity", userData);
  return response.data;
};

// 15/05/26

export const deleteCartProductUser = async (cartData) => {
  const response = await axiosInstance.delete("/removeCartProduct", {
    data: cartData,
  });
  return response.data;
};

export const productShowUser = async ({ pid }) => {
  const response = await axiosInstance.get(`/prodDisplay/${pid}`);
  return response.data;
};

export const updateProdSizeUser = async (cartData) => {
  const response = await axiosInstance.patch("/updateSize", cartData);
  return response.data;
};

export const addReviewUser = async (reviewData) => {
  const response = await axiosInstance.post("/postReview", reviewData);
  return response.data;
};

export const fetchReviewUser = async (reviewData) => {
  const response = await axiosInstance.get("/fetchReview", {
    data: reviewData,
  });
  return response.data;
};

export const addWishListUser = async(wishlistData) => {
  const response = await axiosInstance.post("/addWishlistProd", wishlistData);
  return response.data;
}

export const showWishListUser = async(wishlistData) => {
  const response = await axiosInstance.get("/showWishlist", wishlistData);
  return response.data;
}

export const removeWishListUser = async(wishlistData) => {
  const response = await axiosInstance.delete("/removeWishProd", wishlistData);
  return response.data;
}

export const removeAllCartItemUser = async(cartData) => {
  const response = await axiosInstance.delete("/removeAllCartItem", cartData);
  return response.data;
}

export const moveToCartUser = async(cartData) => {
  const response = await axiosInstance.post("/moveToCart", cartData);
  return response.data;
}



// --------- from other source code --------
// ---- *********** -----------

// Fetch shipping address
export const fetchShippingAddressUser = async () => {
  const response = await axiosInstance.get("/fetchShippingAddress");
  return response.data;
};

// Save shipping address step-1
export const saveShippingAddress1User = async (data) => {
  const response = await axiosInstance.put("/saveShippingAddress-one", data);
  return response.data;
};

// Save shipping address step-2
export const saveShippingAddress2User = async (data) => {
  const response = await axiosInstance.put("/saveShippingAddress-two", data);

  return response.data;
};

// Checkout
export const checkoutUser = async () => {
  const response = await axiosInstance.get("/checkout");

  return response.data;
};

// Place order
export const placeOrderUser = async (data) => {
  const response = await axiosInstance.post("/placeOrder", data);

  return response.data;
};