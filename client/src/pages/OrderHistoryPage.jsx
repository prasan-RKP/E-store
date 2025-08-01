import React, { useEffect, useState } from 'react';
import {
  Package,
  Calendar,
  CreditCard,
  Trash2,
  ShoppingCart,
  Star,
  Eye,
  Download,
  Filter,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';
import { useOrderStore } from '../store/OrderStore.js';
import OrderHistorySkeletonPage from '../skeletons/OrderHistorySkeleton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { userAuthStore } from '../store/authStore.js';
import { RiLoader4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';


const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [allOrderItems, setAllOrderItems] = useState([]); // New state for flattened items
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [length, setLength] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(null);
  const [isCancelling, setIsCancelling] = useState(null);

  // State management destructured functions. 
  const { fetchOrder, order, isFetchingOrder, cancelOrder, orderItemLength } = useOrderStore();
  const { addCart } = userAuthStore();


  //Intial API call to fetch orders
  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrder();
    };
    loadOrders();
  }, [fetchOrder]);

  // Sync local orders state with global store
  useEffect(() => {
    setOrders(order?.orders || []);
  }, [order])

  // NEW: Flatten all order items into a single array with order context
  useEffect(() => {
    const flattenOrderItems = () => {
      const flattened = [];
      orders.forEach(order => {
        order.items.forEach(item => {
          flattened.push({
            ...item,
            orderId: order.id,
            orderNumber: order.orderNumber,
            orderDate: order.date,
            orderTotal: order.total,
            shippingAddress: order.shippingAddress,
            zipCode: order.zipCode,
            paymentMethod: order.paymentMethod,
            estimatedDelivery: order.estimatedDelivery,
            itemTotal: item.price * item.quantity
          });
        });
      });
      setAllOrderItems(flattened);
    };

    if (orders.length > 0) {
      flattenOrderItems();
    } else {
      setAllOrderItems([]);
    }
  }, [orders]);

  //console.log("The updated orderLength", orderItemLength);
  console.log("All flattened order items:", allOrderItems);

  //feature:-  It will count the totalOrders (now counting individual items)
  useEffect(() => {
    setLength(allOrderItems.length);
  }, [allOrderItems]);

  console.log("The order items length", length);

  // feature:2 -> getStatusIcon()
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // feature:3 -> getStatusColor()
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleItemExpansion = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const deleteItem = (orderId, itemId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.filter(item => item.id !== itemId);
        const deletedItem = order.items.find(item => item.id === itemId);
        const newTotal = order.total - (deletedItem.price * deletedItem.quantity);
        return {
          ...order,
          items: updatedItems,
          total: Math.max(0, newTotal)
        };
      }
      return order;
    }).filter(order => order.items.length > 0); // Remove orders with no items
    setOrders(updatedOrders);
  };

  // feature:- The ordered products will be added to the cart for re-order
  const shopAgain = async (item) => {
    //console.log("The item is ", item.pid.toString());
    if (item) {
      setIsAddingToCart(item.pid);
      await addCart({ productId: item.pid, size: item.size });
    }
    else {
      toast.error("Item not found in order history ❌");
      return;
    }
    setIsAddingToCart(null);
  };

  // feature: DownLoad Invoice
  const downloadInvoice = (item, orderId) => {
    alert(`Downloading invoice for "${item.name}" from order ${orderId}`);
  };

  const viewItemDetails = (item) => {
    alert(`Viewing details for "${item.name}" from order ${item.orderNumber}\nPrice: ₹${item.price}\nQuantity: ${item.quantity}\nSize: ${item.size || 'N/A'}\nOrder Date: ${item.orderDate}\nStatus: ${item.status}`);
  };

  // handleCancelOrder 
  const handleCancelOrder = async (orderId, itemId) => {
    //alert(`The orderId is ${orderId} and itemId is ${itemId}`);
    if (orderId && itemId) {
      setIsCancelling(itemId);
      await cancelOrder({ orderId: orderId, itemId: itemId });
      await fetchOrder(); // Refresh orders after cancellation
    }
    else {
      toast.error("Your Product is not found ☹️");
      return;
    }
    setIsCancelling(null);
  };

  // NEW: Filter individual order items instead of orders
  const filteredOrderItems = allOrderItems.filter(item => {
    const matchesSearch = item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  console.log("my filteredOrderItems are", filteredOrderItems);

  // Show loading skeleton while fetching
  if (isFetchingOrder) {
    return <OrderHistorySkeletonPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Order History
                </h2>
                <p className="text-gray-600 sm:text-sm text-lg">Track and manage your orders</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-200 px-6 py-3 rounded-xl border border-blue-100">
                  <span className="text-blue-700 font-semibold text-lg">{length} Orders</span>
                </div>

                <Link to={"/addTocart"} >
                  <div className="hover:cursor-pointer relative text-blue-700">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {2}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search orders or products 🔍..."
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
              <select
                className="pl-5 pr-8 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-gray-700 transition-all duration-300 hover:bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Items List - NEW: Display individual items */}
        <div className="space-y-6">
          {filteredOrderItems.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/50">
              <motion.img
                src="/illus/order.svg"
                alt="No Orders"
                className="w-40 h-40 mx-auto mb-6"
                initial={{ opacity: 0, y: 30, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: 3 }}
              />

              {/* Buttons Section */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                <Link to="/#products">
                  <motion.button
                    className="bg-blue-900 text-white px-6 py-3 rounded-2xl text-center hover:bg-blue-950 cursor-pointer w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Shop
                  </motion.button>
                </Link>

                <Link to="/addtocart">
                  <motion.button
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl text-center hover:from-green-600 hover:to-emerald-700 cursor-pointer w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Cart
                  </motion.button>
                </Link>
              </div>

              <motion.h3
                className="text-2xl font-semibold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                No order items found
              </motion.h3>

              <motion.p
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {allOrderItems.length === 0
                  ? "You haven't placed any orders yet"
                  : "Try adjusting your search or filters"}
              </motion.p>
            </div>

          ) : (
            filteredOrderItems.map((item) => (
              <div key={`${item.orderId}-${item.id}`} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 overflow-hidden">
                <div className="p-6">
                  {/* Item Header with Status */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(item.status)}
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{new Date(item.orderDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 font-medium">Order #{item.orderNumber}</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">₹{item.itemTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Individual Item Display */}
                  <div className="group">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-200 hover:border-blue-200">
                      <div className="flex items-center space-x-4 flex-1">
                        <Link to={`/productshow/${item?.pid}`}>
                          <div className="hover:cursor-pointer relative overflow-hidden rounded-xl">
                            <img
                              src={item.image || `https://as1.ftcdn.net/v2/jpg/11/07/10/76/1000_F_1107107684_npR9Dk3AmlvssBE7MGwKTwHzRrEgdlzl.jpg`}
                              alt={item.name}
                              className="hover:cursor-pointer w-20 h-20 rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop&q=60`;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Qty: <span className="font-medium">{item.quantity}</span></span>
                            {item.size && <span>Size: <span className="font-medium">{item.size}</span></span>}
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <p className="text-sm font-bold text-gray-900">₹{item.price.toFixed(2)}</p>
                            <p className="text-lg text-gray-600">
                              Total: <span className="font-semibold text-green-600">₹{item.itemTotal.toFixed(2)}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleItemExpansion(`${item.orderId}-${item.id}`)}
                        className="p-3 hover:bg-white/80 rounded-xl transition-all duration-300 hover:shadow-md group-hover:text-blue-600"
                      >
                        {expandedItems.has(`${item.orderId}-${item.id}`) ? (
                          <ChevronDown className="w-6 h-6 transform transition-transform duration-300" />
                        ) : (
                          <ChevronRight className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Item Actions */}
                    {expandedItems.has(`${item.orderId}-${item.id}`) && (
                      <div className="mt-4 p-6 bg-white/80 rounded-xl border border-gray-200 shadow-inner">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                              Shipping Address
                            </h5>
                            <p className="text-gray-600 text-sm">{item.shippingAddress}</p>
                            {item.zipCode && (
                              <p className="text-gray-500 text-sm mt-1">ZIP: {item.zipCode}</p>
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                              Payment Method
                            </h5>
                            <p className="text-gray-600 text-sm">{item.paymentMethod}</p>
                            {item.estimatedDelivery && item.estimatedDelivery !== 'N/A' && (
                              <p className="text-gray-500 text-xs mt-1">Delivery: {item.estimatedDelivery}</p>
                            )}
                          </div>
                        </div>

                        {/* Individual Item Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => viewItemDetails(item)}
                            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="font-medium">View Details</span>
                          </button>

                          <button
                            onClick={() => downloadInvoice(item, item.orderId)}
                            className="hover:cursor-pointer flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105"
                          >
                            <Download className="w-4 h-4" />
                            <span className="font-medium">Download Invoice</span>
                          </button>

                          <button
                            onClick={() => shopAgain(item)}
                            className="hover:cursor-pointer flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105"
                            disabled={isAddingToCart === item.id}
                          >
                            {isAddingToCart === item.id ? (
                              <span className="flex items-center justify-center">
                                Loading... <RiLoader4Line className="w-6 h-6 animate-spin" />
                              </span>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                <span className="font-medium">Shop Again</span>
                              </>
                            )}
                          </button>

                          {/* Use individual item status instead of overall order status */}
                          {item.status === 'shipped' || item.status === 'processing' ? (
                            <button
                              onClick={() => handleCancelOrder(item.orderId, item.id)}
                              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer"
                            >
                              {isCancelling === item.id ? (
                                <span className="flex items-center justify-center">
                                  Loading... <RiLoader4Line className="w-6 h-6 animate-spin" />
                                </span>
                              ) : (
                                <>
                                  <X className="w-4 h-4" />
                                  <span className="font-medium">Cancel Order</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => deleteItem(item.orderId, item.id)}
                              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="font-medium">Delete Item</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Statistics - Updated to use individual item statuses */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Items</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {length}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Delivered Items</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {allOrderItems.filter(item => item.status === 'delivered').length}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Cancelled Items</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  {allOrderItems.filter(item => item.status === 'cancelled').length}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;