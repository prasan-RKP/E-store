import { create } from "zustand";
import { toast } from "sonner";
import { orderInstance } from "../lib/orderInstance.js";
import { isCancel } from "axios";

export const useOrderStore = create((set, get) => ({
  order: null,
  isFetchingOrder: false,
  isCancelingOrder: false,
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

  cancelOrder: async (data) => {
    set({ isCancelingOrder: true });
    try {
      const res = await orderInstance.put("/cancelOrder", data);
      set({ order: res.data });
      toast.success("Order canceled successfully 📦");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong...");
      }
    } finally {
      set({ isCancelingOrder: false });
    }
  },
}));
