import { create } from "zustand";
import { toast } from "sonner";
import { prodInstance } from "../lib/prodInstance.js";
//import { userAuthStore } from "./authStore.js";
//const user = userAuthStore.getState().verifiedUser;

export const useProdStore = create((set, get) => ({
  products: null,
  isFetchingAccs: false,
  isFetchingManCloth: false,
  isFetchingWomenCloth: false,
  isFetchingFootWear: false,

  fetchAccs: async () => {
    set({ isFetchingAccs: true });

    try {
      const res = await prodInstance.get("/fetchAccess");
      set({ products: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong..");
      }
    } finally {
      set({ isFetchingAccs: false });
    }
  },

  fetchingMenCloth: async () => {
    set({ isFetchingManCloth: true });

    try {
      const res = await prodInstance.get("/fetchManCloth");
      set({ products: res.data });
      //toast.info("Welcome to Men's Section 🎊");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong..");
      }
    } finally {
      set({ isFetchingAccs: false });
    }
  },

  fetchingWomenCloth: async (data) => {
    set({ isFetchingWomenCloth: true });
    try {
      const res = await prodInstance.get("/fetchWomenCloth", data);
      set({ products: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong..");
      }
    } finally {
      set({ isFetchingWomenCloth: false });
    }
  },

  fetchingFootWear: async (data) => {
    set({ isFetchingFootWear: true });
    try {
      const res = await prodInstance.get("/fetchFootwear", data);
      set({ products: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      set({ isFetchingFootWear: false });
    }
  },
}));
