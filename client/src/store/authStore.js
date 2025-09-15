import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import { toast } from "sonner";

export const userAuthStore = create((set, get) => ({
  setStatus: 400,
  wishlist: {},
  verifiedUser: null,
  review: null,
  authProdDetail: null,
  isLoggingIn: false,
  isSigningIn: false,
  isAddingToCart: false,
  isCheckingVerified: true,
  isSavingChanges: false,
  isShowingAddToCartItems: false,
  isIncrementQuantity: true,
  isDecrementQuantity: false,
  deletingCartProd: false,
  isProdDisplay: false,
  isCartItemExist: false,
  isUpdatingProdSize: false,
  isAddingReview: false,
  isFetchingReview: false,
  isWishListing: false,
  isRemovingWishProd: false,
  isShowingWishlistItem: false,
  isRemovingAllCartItem: false,
  isFetchingShippingAddress: false,
  cartTotal: 0,

  // just sending the cart total to the another component who will need it later
  setCartTotal: (total) => set({ cartTotal: total }),

  checkAuthVerify: async () => {
    //console.log("frontend value",get().verifiedUser );
    try {
      const res = await axiosInstance.get("/check");
      set({ verifiedUser: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong in useAuthStore");
      }
      set({ verifiedUser: null });
    } finally {
      set({ isCheckingVerified: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/signup", data);

      set({ verifiedUser: res.data });
      toast.success("Congratulation you have successfully Registered");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went Wrong in signup use");
      }
    } finally {
      set({ isSigningIn: false });
    }
  },

  logIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ verifiedUser: res.data });
      toast.success("LoggedIn successfully ✅");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong in Login use");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    //console.log("logout called frontend 1")
    try {
      await axiosInstance.post("/logout");
      set({ authUser: null }); // Clear authUser and onlineUsers
      await get().checkAuthVerify(); // call it again to check is it correctly logout or not .
      toast.success("Logged out successfully ✅");
    } catch (error) {
      if (
        error.response.data.message?.includes("unAuthrized") ||
        error.response.data.message?.includes("Invalid User")
      ) {
        console.log("User is already logged out or session expired");
      } else {
        toast.error("Something went Wrong..");
      }
    }
  },

  saveChange: async (data) => {
    set({ isSavingChanges: true });
    try {
      const res = await axiosInstance.put("/saveChange", data);
      set({ verifiedUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : console.log("Something Error occured")
      );
    } finally {
      set({ isSavingChanges: false });
    }
  },

  addCart: async (data) => {
    // console.log(`my productId ${data.pid} myProductSize ${data.size} from authstore`);
    set({ isAddingToCart: true });
    try {
      const res = await axiosInstance.post("/addCartData", data);
      set({ verifiedUser: res.data });
      toast.success("Item added to cart ✅");
    } catch (error) {
      //{error.response ? toast.error(error.response.data.message) : console.log("Something error occured")}
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something error occured");
      }
    } finally {
      set({ isAddingToCart: false });
    }
  },

  showAddToCart: async () => {
    set({ isShowingAddToCartItems: true });
    try {
      const res = await axiosInstance.get("/showAddToCart");
      set({ verifiedUser: res.data });
      toast.success("Your cart Items 🎉");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Internal server Error");
      }
    } finally {
      set({ isShowingAddToCartItems: false });
    }
  },

  //
  incrementQuantity: async (data) => {
    set({ isIncrementQuantity: true });
    try {
      const res = await axiosInstance.post("/incQuantity", data);
      set({ verifiedUser: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      toast.error("Something Error occured");
    } finally {
      set({ isIncrementQuantity: false });
    }
  },

  //
  decrementQuantity: async (data) => {
    set({ isDecrementQuantity: true });
    try {
      const res = await axiosInstance.post("/decQuantity", data);
      set({ verifiedUser: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Error occured");
      }
    } finally {
      set({ isDecrementQuantity: false });
    }

    //console.log("Decrement clicked & Idno", data);
  },

  deleteCartProduct: async (data) => {
    set({ deletingCartProd: true });
    try {
      const res = await axiosInstance.post("/removeCartProduct", data);
      set({ verifiedUser: res.data });
      toast.success("Product removed Successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went Wrong");
      }
    } finally {
      set({ deletingCartProd: false });
    }
  },

  productShow: async ({ pid }) => {
    set({ isProdDisplay: true });
    try {
      const res = await axiosInstance.get(`/prodDisplay/${pid}`);
      set({ authProdDetail: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Internal server Error");
      }
    } finally {
      set({ isProdDisplay: false });
    }
  },

  updateProdSize: async (data) => {
    set({ isUpdatingProdSize: true });
    try {
      //console.log(`Getting new Size:${data.size} and prodId:${data.productId}`)
      const res = await axiosInstance.post("/updateSize", data);
      set({ verifiedUser: res.data });
      toast.success("Size Updated ✅");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      set({ isUpdatingProdSize: false });
    }
  },

  addReview: async (data) => {
    set({ isAddingReview: true });
    //console.log("The uploded data", data);
    // todo from here planning is frontend is working let's jump to backend ....
    try {
      const res = await axiosInstance.post("/postReview", data);
      set({ review: res.data?.review });
      toast.success("Review Submitted Succesfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      set({ isAddingReview: false });
    }
  },

  fetchReviews: async ({ pid }) => {
    //console.log("current prodIs", pid);
    set({ isFetchingReview: true });

    try {
      const res = await axiosInstance.get(`/fetchReview/${pid}`);
      set({ review: res.data?.review });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      set({ isFetchingReview: false });
    }
  },

  fetchWishListProd: async (data) => {
    set({ isWishListing: true });
    try {
      const res = await axiosInstance.post("/addWishlistProd", data);

      const productId = data.pid; // ✅ This is what you sent from frontend
      set((state) => ({
        //verifiedUser: res.data, (old code-> which was not working)
        verifiedUser: {
          ...state.verifiedUser, // Preserve existing data
          wishlist: res.data.wishlist, // Only update wishlist
        },
        wishlist: { ...state.wishlist, [productId]: true },
        setStatus: res.status,
      }));

      toast.success("Item added to WishList ✅");
    } catch (error) {
      const statusCode = error?.response?.status || 500;
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      set({ setStatus: statusCode });
    } finally {
      set({ isWishListing: false });
    }
  },

  showWishListItem: async () => {
    set({ isShowingWishlistItem: true });

    try {
      // console.log('AuthStore given the backend value')
      const res = await axiosInstance.get("/showWishlist");

      const { user, wishlist, cart } = res.data;
      set({
        verifiedUser: {
          ...user,
          wishlist, // ✅ populated
          cart,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error");
    } finally {
      set({ isShowingWishlistItem: false });
    }
  },

  removeWishListProd: async (data) => {
    set({ isRemovingWishProd: true });
    try {
      const res = await axiosInstance.post("/removeWishProd", data);
      set({ verifiedUser: res.data });
      toast.success("WishItem Removed successfully ✅");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      set({ isRemovingWishProd: false });
    }
  },

  removeAllCartItems: async () => {
    // console.log("calling the remove All");

    set({ isRemovingAllCartItem: true });
    try {
      const res = await axiosInstance.post("/removeAllCartItem");
      set({ verifiedUser: res.data });
      toast.success("Your Cart is Empty now 🫙");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      set({ isRemovingAllCartItem: false });
    }
  },

  moveToAddCart: async (data) => {
    // console.log(`The productId:${data.productId}, prodSize:${data.size}`);
    try {
      const res = await axiosInstance.post("/moveToCart", data);
      set({ verifiedUser: res.data });
      toast.success("Product moved to Cart ✅");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  },

  setShippingAddress: async (data) => {
    set({ isFetchingShippingAddress: true });
    try {
      const res = await axiosInstance.get("/fetchShippingAddress");
      set({ verifiedUser: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      set({ isFetchingShippingAddress: false });
    }
  },

  // CheckOut operations are starts from here

  // feature - 1(#checkout) - Saving the shipping address

  isSavingShippingAddress1: false,
  saveShippingAddress1: async (data) => {
    set({ isSavingShippingAddress1: true });

    try {
      const res = await axiosInstance.put("/saveShippingAddress-one", data);
      set({ verifiedUser: res.data });
      toast.success("Shipping address saved !");
      return true; // ✅ indicate success
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong in saving shipping address");
      }
      return false; // ❌ indicate failure
    } finally {
      set({ isSavingShippingAddress1: false });
    }
  },

  isSavingShippingAddress2: false,
  saveShippingAddress2: async (data) => {
    set({ isSavingShippingAddress2: true }); // ✅ fixed

    try {
      const res = await axiosInstance.put("/saveShippingAddress-two", data);
      set({ verifiedUser: res.data });
      toast.success("Payment method saved !");
      return true;
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong in saving payment method");
      }
      return false;
    } finally {
      set({ isSavingShippingAddress2: false });
    }
  },

  // feature - 2(#checkout) - Checkout process

  isCheckingOut: false,
  checkout: async () => {
    set({ isCheckingOut: true });
    try {
      const res = await axiosInstance.get("/checkout");
      set({ verifiedUser: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong in checkout");
      }
    } finally {
      set({ isCheckingOut: false });
    }
  },

  // feature - 3(#checkout) - Placing the order
  isPlacingOrder: false,
  placeOrder: async (data) => {
    set({ isPlacingOrder: true });
    try {
      const res = await axiosInstance.post("/placeOrder", data);
      set({ verifiedUser: res.data });
      toast.success("Order placed successfully!");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong in placing order");
      }
    } finally {
      set({ isPlacingOrder: false });
    }
  },
}));
