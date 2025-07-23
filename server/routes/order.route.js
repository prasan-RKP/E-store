import express from 'express';
import Order from '../src/model/OrderPlace.js';

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

export default router;