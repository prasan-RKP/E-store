import express from "express";
import Order from "../src/model/OrderPlace.js";
import { protectedRoute } from "../src/middleware/middleware.js";

const router = express.Router();

router.get("/fetchOrder", protectedRoute, async (req, res) => {
  try {
    const orders = await Order.find();
    const userId = req.user?.id;

    // TO tackle some error
    if (!orders) {
      return res.status(404).json({ message: "No Orders Found.." });
    }

    const transformedOrders = orders.map((order) => ({
      id: order._id.toString(),
      date: new Date(order.createdAt).toISOString().split("T")[0],
      total: order.totalAmount,
      orderNumber: order.orderNumber,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      estimatedDelivery: order.deliveryTime,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhoneNo: order.customerPhoneNo,
      zipcode: order.zipCode,
      // Adding code from here
      userId: order.user._id,
      items: order.items.map((item) => ({
        pid: item.uid, // help to get acces from where the product Came(mean from which schema "Men", "Women", "Accessory", "Footwears")
        id: item._id,
        name: item.prodName,
        price: item.prodPrice,
        quantity: item.prodQuantity,
        image: item.prodImage,
        size: item.prodSize,
        status: item.prodStatus,
        orderDate: new Date(order.createdAt).toISOString().split("T")[0],
      })),
    }));

    return res.status(200).json({ orders: transformedOrders, myId:userId });
  } catch (error) {
    console.log("Error in Fetching orders", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/cancelOrder", protectedRoute, async (req, res) => {
  const { orderId, itemId } = req.body;

  try {
    if (!orderId)
      return res.status(400).json({ message: "Your Order not Found" });
    if (!itemId)
      return res.status(400).json({ message: "Your Product not Found" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const item = order.items.id(itemId);
    if (!item)
      return res.status(404).json({ message: "Item not found in the order" });

    // Update status
    item.prodStatus = "cancelled";
    await order.save();

    // ✅ Transform order for consistency
    const transformedOrder = {
      id: order._id.toString(),
      date: new Date(order.createdAt).toISOString().split("T")[0],
      total: order.totalAmount,
      orderNumber: order.orderNumber,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      estimatedDelivery: order.deliveryTime,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhoneNo: order.customerPhoneNo,
      zipcode: order.zipCode,
      items: order.items.map((item) => ({
        id: item._id,
        name: item.prodName,
        price: item.prodPrice,
        quantity: item.prodQuantity,
        image: item.prodImage,
        size: item.prodSize,
        status: item.prodStatus,
      })),
    };

    return res.status(200).json({ order: transformedOrder});
  } catch (error) {
    console.error("Cancel Order Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
