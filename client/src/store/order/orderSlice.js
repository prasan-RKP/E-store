import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder, cancelOrder } from "./orderThunk.js";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= FETCH ORDER =================

      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CANCEL ORDER =================

      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = action.payload;
        // remove cancelled order from state
        
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;