import express from 'express';
import Order from '../src/model/OrderPlace.js';
import { protectedRoute } from '../src/middleware/middleware.js';

const router = express.Router();

router.get('/fetchOrder', async (req, res) => {
    
    try {
        const orders = await Order.find();
        if(!orders) {
            return res.status(400).json({message: "Unable to Fetching Orders now..."});
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.log("Error in Fetching orders", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

/*
TODO:- for tommorow
router.get('/fetchOrder', async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Transform orders for frontend
    const transformedOrders = orders.map(order => ({
      id: order.orderNumber || order._id.toString(),  // For UI
      date: new Date(order.createdAt).toISOString().split('T')[0],
      status: getOrderStatus(order.items),  // Determine overall order status
      total: order.totalAmount,
      items: order.items.map(item => ({
        _id: item._id,      // ✅ Keep DB _id for cancel API
        uid: item.uid,      // Original UID
        name: item.prodName,
        price: item.prodPrice,
        quantity: item.prodQuantity,
        image: item.prodImage,
        size: item.prodSize,
        status: item.prodStatus
      })),
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      estimatedDelivery: order.deliveryTime,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhoneNo: order.customerPhoneNo,
      zipCode: order.zipCode
    }));

    return res.status(200).json(transformedOrders);
  } catch (error) {
    console.error("Error in Fetching orders:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Helper function to calculate overall order status
function getOrderStatus(items) {
  if (!items || items.length === 0) return 'unknown';

  const statuses = items.map(item => item.prodStatus);
  const uniqueStatuses = [...new Set(statuses)];

  if (uniqueStatuses.length === 1) return uniqueStatuses[0];
  if (statuses.includes('cancelled')) return 'cancelled';
  if (statuses.includes('delivered')) return 'delivered';
  if (statuses.includes('shipped')) return 'shipped';
  return 'processing'; // Default
}


*/

router.put("/cancelOrder", protectedRoute, async(req, res)=> {
    // Todo:- Tommorow task 
})

export default router;