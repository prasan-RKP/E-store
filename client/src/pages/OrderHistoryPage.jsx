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
  const [cartLength, setCartLength] = useState(0)

  // State management destructured functions. 
  const { fetchOrder, order, isFetchingOrder, cancelOrder, orderItemLength } = useOrderStore();
  const { addCart, verifiedUser } = userAuthStore();

  //console.log("Verified user", verifiedUser?.cart?.length);
  // Setting the CartLength
  useEffect(() => {
    setCartLength(verifiedUser?.cart?.length);
  }, [verifiedUser?.cart])

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900">
      {/* Header */}
      <div className="bg-slate-800/90 backdrop-blur-lg shadow-2xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Order History
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg">Track and manage your orders</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-xl border border-blue-800/50 w-full sm:w-auto text-center">
                  <span className="text-blue-300 font-semibold text-sm sm:text-lg">{length} Orders</span>
                </div>

                <Link to={"/addTocart"} className="w-full sm:w-auto">
                  <div className="hover:cursor-pointer relative text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-slate-700/50 rounded-lg w-full sm:w-auto flex justify-center sm:justify-start">
                    <div className="relative">
                      <ShoppingCart className="h-6 w-6" />
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartLength}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search and Filter Bar */}
        <div className="bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-700/50">
          <div className="flex flex-col gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search orders or products 🔍..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 bg-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative group w-full sm:w-auto">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <select
                className="w-full pl-12 pr-8 py-3 sm:py-4 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700/50 backdrop-blur-sm text-gray-100 transition-all duration-300 hover:bg-slate-700/70 text-sm sm:text-base"
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
        <div className="space-y-4 sm:space-y-6">
          {filteredOrderItems.length === 0 ? (
            <div className="bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-12 text-center border border-slate-700/50">
              <motion.img
                src="/illus/order.svg"
                alt="No Orders"
                className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6"
                initial={{ opacity: 0, y: 30, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: 3 }}
              />

              {/* Buttons Section */}
              <div className="flex flex-col gap-3 sm:gap-4 mb-6">
                <Link to="/#products" className="w-full">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl w-full transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Go to Shop
                  </motion.button>
                </Link>

                <Link to="/addtocart" className="w-full">
                  <motion.button
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl w-full transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Go to Cart
                  </motion.button>
                </Link>
              </div>

              <motion.h3
                className="text-xl sm:text-2xl font-semibold text-gray-100 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                No order items found
              </motion.h3>

              <motion.p
                className="text-gray-300 text-base sm:text-lg"
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
              <motion.div
                key={`${item.orderId}-${item.id}`}
                className="bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-slate-700/50 transition-all duration-300 border border-slate-700/50 overflow-hidden hover:border-slate-600/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="p-4 sm:p-6">
                  {/* Item Header with Status */}
                  <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(item.status)}
                        <span className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-medium">{new Date(item.orderDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm text-gray-300 font-medium">Order #{item.orderNumber}</p>
                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">₹{item.itemTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Individual Item Display */}
                  <div className="group">
                    <div className="flex items-center justify-between p-3 sm:p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl hover:from-blue-900/30 hover:to-purple-900/30 transition-all duration-300 border border-slate-600/30 hover:border-blue-500/30">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <Link to={`/productshow/${item?.pid}`} className="flex-shrink-0">
                          <div className="hover:cursor-pointer relative overflow-hidden rounded-xl">
                            <img
                              src={item.image || `https://as1.ftcdn.net/v2/jpg/11/07/10/76/1000_F_1107107684_npR9Dk3AmlvssBE7MGwKTwHzRrEgdlzl.jpg`}
                              alt={item.name}
                              className="hover:cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop&q=60`;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-lg font-semibold text-gray-100 truncate group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-300 mt-1 space-y-1 sm:space-y-0">
                            <span>Qty: <span className="font-medium text-white">{item.quantity}</span></span>
                            {item.size && <span>Size: <span className="font-medium text-white">{item.size}</span></span>}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-100">₹{item.price.toFixed(2)}</p>
                            <p className="text-sm sm:text-lg text-gray-300">
                              Total: <span className="font-semibold text-green-400">₹{item.itemTotal.toFixed(2)}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleItemExpansion(`${item.orderId}-${item.id}`)}
                        className="p-2 sm:p-3 hover:bg-slate-600/50 rounded-xl transition-all duration-300 hover:shadow-md group-hover:text-blue-400 flex-shrink-0 ml-2"
                      >
                        {expandedItems.has(`${item.orderId}-${item.id}`) ? (
                          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 text-gray-300" />
                        ) : (
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 group-hover:translate-x-1 text-gray-300" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Item Actions */}
                    {expandedItems.has(`${item.orderId}-${item.id}`) && (
                      <motion.div
                        className="mt-4 p-4 sm:p-6 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-inner"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 gap-4 mb-6">
                          <div>
                            <h5 className="font-semibold text-gray-100 mb-2 flex items-center text-sm sm:text-base">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" />
                              Shipping Address
                            </h5>
                            <p className="text-gray-300 text-xs sm:text-sm">{item.shippingAddress}</p>
                            {item.zipCode && (
                              <p className="text-gray-400 text-xs mt-1">ZIP: {item.zipCode}</p>
                            )}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-100 mb-2 flex items-center text-sm sm:text-base">
                              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" />
                              Payment Method
                            </h5>
                            <p className="text-gray-300 text-xs sm:text-sm">{item.paymentMethod}</p>
                            {item.estimatedDelivery && item.estimatedDelivery !== 'N/A' && (
                              <p className="text-gray-400 text-xs mt-1">Delivery: {item.estimatedDelivery}</p>
                            )}
                          </div>
                        </div>

                        {/* Individual Item Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-600/50">
                          <button
                            onClick={() => viewItemDetails(item)}
                            className="flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-gray-600/50 hover:to-gray-500/50 text-gray-200 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer text-xs sm:text-sm"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-medium">View Details</span>
                          </button>

                          <button
                            onClick={() => downloadInvoice(item, item.orderId)}
                            className="hover:cursor-pointer flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-800/50 to-blue-700/50 hover:from-blue-700/50 hover:to-blue-600/50 text-blue-200 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 text-xs sm:text-sm"
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-medium">Download Invoice</span>
                          </button>

                          <button
                            onClick={() => shopAgain(item)}
                            className="hover:cursor-pointer flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-green-800/50 to-green-700/50 hover:from-green-700/50 hover:to-green-600/50 text-green-200 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 text-xs sm:text-sm"
                            disabled={isAddingToCart === item.id}
                          >
                            {isAddingToCart === item.id ? (
                              <span className="flex items-center justify-center">
                                <RiLoader4Line className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" />
                              </span>
                            ) : (
                              <>
                                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-medium">Shop Again</span>
                              </>
                            )}
                          </button>

                          {/* Use individual item status instead of overall order status */}
                          {item.status === 'shipped' || item.status === 'processing' ? (
                            <button
                              onClick={() => handleCancelOrder(item.orderId, item.id)}
                              className="flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-red-800/50 to-red-700/50 hover:from-red-700/50 hover:to-red-600/50 text-red-200 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer text-xs sm:text-sm"
                            >
                              {isCancelling === item.id ? (
                                <span className="flex items-center justify-center">
                                  <RiLoader4Line className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" />
                                </span>
                              ) : (
                                <>
                                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="font-medium">Cancel Order</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => deleteItem(item.orderId, item.id)}
                              className="flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-red-800/50 to-red-700/50 hover:from-red-700/50 hover:to-red-600/50 text-red-200 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer text-xs sm:text-sm"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="font-medium">Delete Item</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Summary Statistics - Updated to use individual item count */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/80 rounded-2xl p-6 flex flex-col items-center shadow-lg border border-slate-700/50">
            <Package className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-2xl font-bold text-blue-300">{length}</span>
            <span className="text-gray-300 text-sm mt-1">Total Items Ordered</span>
          </div>
          <div className="bg-slate-800/80 rounded-2xl p-6 flex flex-col items-center shadow-lg border border-slate-700/50">
            <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-2xl font-bold text-green-300">
              {allOrderItems.filter(item => item.status === "delivered").length}
            </span>
            <span className="text-gray-300 text-sm mt-1">Delivered</span>
          </div>
          <div className="bg-slate-800/80 rounded-2xl p-6 flex flex-col items-center shadow-lg border border-slate-700/50">
            <Truck className="w-8 h-8 text-blue-400 mb-2" />
            <span className="text-2xl font-bold text-blue-300">
              {allOrderItems.filter(item => item.status === "shipped").length}
            </span>
            <span className="text-gray-300 text-sm mt-1">Shipped</span>
          </div>
          <div className="bg-slate-800/80 rounded-2xl p-6 flex flex-col items-center shadow-lg border border-slate-700/50">
            <XCircle className="w-8 h-8 text-red-400 mb-2" />
            <span className="text-2xl font-bold text-red-300">
              {allOrderItems.filter(item => item.status === "cancelled").length}
            </span>
            <span className="text-gray-300 text-sm mt-1">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;