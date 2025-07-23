import { create } from "zustand";
import { toast } from "sonner";
import { orderInstance } from "../lib/orderInstance.js";

export const useOrderStore = create((set, get) => ({
  order: null,
  isFetchingOrder: false,
  fetchOrder: async () => {
    set({ isFetchingOrder: true });
    try {
      const res = await orderInstance.get("/fetchOrder");
      set({ order: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong...");
      }
    } finally {
      set({ isFetchingOrder: false });
    }
  },
}));
