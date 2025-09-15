import { create } from "zustand";
import { toast } from "sonner";
import { orderInstance } from "../lib/orderInstance.js";
//import { isCancel } from "axios";

export const useOrderStore = create((set, get) => ({
  order: null,
  isFetchingOrder: false,
  isCancelingOrder: false,
  orderItemLength: 0,

  fetchOrder: async () => {
    set({ isFetchingOrder: true });
    try {
      const res = await orderInstance.get("/fetchOrder");

      const allOrders = res.data?.orders || [];
      const myId = res.data?.myId;

      // ✅ filter orders that belong to logged-in user
      const userOrders = allOrders.filter((order) => order.userId === myId);

      // ✅ count total items from filtered orders
      const totalItems = userOrders.reduce(
        (sum, order) => sum + (order.items?.length || 0),
        0
      );

      // ✅ set state with filtered orders + item length
      set({
        order: { orders: userOrders }, // keep same shape as backend
        orderItemLength: totalItems,
      });
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
