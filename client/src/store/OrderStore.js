import { create } from "zustand";
import { toast } from "sonner";
import { orderInstance } from "../lib/orderInstance.js";
import { isCancel } from "axios";

export const useOrderStore = create((set, get) => ({
  order: null,
  isFetchingOrder: false,
  isCancelingOrder: false,
  orderItemLength: 0,

  fetchOrder: async () => {
    set({ isFetchingOrder: true });
    try {
      const res = await orderInstance.get("/fetchOrder");
      set({ order: res.data });
      // to count the total orders and give it to the backend
      const orders = res.data?.orders || [];
      const totalItems = orders.reduce(
        (sum, order) => sum + (order.items?.length || 0),
        0
      );
      set({orderItemLength: totalItems});
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
      set({ order: res.data }); // ✅ But this might replace `order` state with raw API response
      toast.success("Order cancelled successfully 📦");
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
