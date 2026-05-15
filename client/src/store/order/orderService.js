import {orderInstance} from '../../lib/orderInstance.js';

export const fetchOrderUser = async() => {
    const response = await orderInstance.get('/fetchOrder');
    return response.data;
}

export const cancelOrderUser = async(orderData) => {
    const response = await orderInstance.delete('/cancelOrder', orderData);
    return response.data;
}