import React, { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-12-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 149.99, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 2, name: 'Phone Case', price: 29.99, quantity: 2, image: '/api/placeholder/80/80' },
        { id: 3, name: 'Charging Cable', price: 19.99, quantity: 5, image: '/api/placeholder/80/80' }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card ending in 4242',
      estimatedDelivery: '2024-12-18'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-12-10',
      status: 'shipped',
      total: 599.99,
      items: [
        { id: 4, name: 'Laptop Stand', price: 79.99, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 5, name: 'Mechanical Keyboard', price: 159.99, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 6, name: 'Wireless Mouse', price: 89.99, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 7, name: 'Monitor Light', price: 49.99, quantity: 1, image: '/api/placeholder/80/80' }
      ],
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      paymentMethod: 'PayPal',
      estimatedDelivery: '2024-12-20'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-12-05',
      status: 'processing',
      total: 199.99,
      items: [
        { id: 8, name: 'Bluetooth Speaker', price: 99.99, quantity: 1, image: '/api/placeholder/80/80' },
        { id: 9, name: 'Power Bank', price: 49.99, quantity: 2, image: '/api/placeholder/80/80' }
      ],
      shippingAddress: '789 Pine St, Chicago, IL 60601',
      paymentMethod: 'Credit Card ending in 1234',
      estimatedDelivery: '2024-12-25'
    },
    {
      id: 'ORD-2024-004',
      date: '2024-11-28',
      status: 'cancelled',
      total: 89.99,
      items: [
        { id: 10, name: 'Fitness Tracker', price: 89.99, quantity: 1, image: '/api/placeholder/80/80' }
      ],
      shippingAddress: '321 Elm St, Miami, FL 33101',
      paymentMethod: 'Credit Card ending in 5678',
      estimatedDelivery: 'N/A'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

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

  const shopAgain = (item) => {
    alert(`Added "${item.name}" to cart for reorder!`);
  };

  const downloadInvoice = (item, orderId) => {
    alert(`Downloading invoice for "${item.name}" from order ${orderId}`);
  };

  const viewItemDetails = (item, order) => {
    alert(`Viewing details for "${item.name}" from order ${order.id}\nPrice: ₹${item.price}\nQuantity: ${item.quantity}\nOrder Date: ${order.date}\nStatus: ${order.status}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  console.log("Filtered Orders:", filteredOrders);

  // Create consistent image mapping based on product names
  const getProductImage = (itemName, itemId) => {
    const imageMap = {
      'Wireless Headphones': "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600&auto=format&fit=crop&q=60",
      'Phone Case': "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&auto=format&fit=crop&q=60",
      'Charging Cable': "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=60",
      'Laptop Stand': "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=60",
      'Mechanical Keyboard': "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60",
      'Wireless Mouse': "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop&q=60",
      'Monitor Light': "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60",
      'Bluetooth Speaker': "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=60",
      'Power Bank': "https://images.unsplash.com/photo-1609592806763-b7129dfb5bf1?w=600&auto=format&fit=crop&q=60",
      'Fitness Tracker': "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=60"
    };
    
    // Return specific image for product name, or fallback based on ID
    return imageMap[itemName] || `https://images.unsplash.com/photo-${1500000000 + itemId}?w=600&auto=format&fit=crop&q=60`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Order History
                </h1>
                <p className="text-gray-600 text-lg">Track and manage your orders</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-xl border border-blue-100">
                  <span className="text-blue-700 font-semibold text-lg">{filteredOrders.length} Orders</span>
                </div>
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
                placeholder="Search orders or products..."
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
              <select
                className="pl-12 pr-8 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-gray-700 transition-all duration-300 hover:bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {filteredOrders.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/50">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No orders found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 overflow-hidden">
                <div className="p-8">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 font-medium">Order #{order.id}</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">₹{order.total}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items with Individual Controls */}
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-200 hover:border-blue-200">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="relative overflow-hidden rounded-xl">
                              <img
                                src={getProductImage(item.name, item.id)}
                                alt={item.name}
                                className="w-20 h-20 rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>
                              <div className="flex items-center space-x-4 mt-2">
                                <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                                <p className="text-sm text-gray-600">
                                  Total: <span className="font-semibold text-green-600">₹{(item.price * item.quantity).toFixed(2)}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleItemExpansion(item.id)}
                            className="p-3 hover:bg-white/80 rounded-xl transition-all duration-300 hover:shadow-md group-hover:text-blue-600"
                          >
                            {expandedItems.has(item.id) ? (
                              <ChevronDown className="w-6 h-6 transform transition-transform duration-300" />
                            ) : (
                              <ChevronRight className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                            )}
                          </button>
                        </div>

                        {/* Expanded Item Actions */}
                        {expandedItems.has(item.id) && (
                          <div className="mt-4 p-6 bg-white/80 rounded-xl border border-gray-200 shadow-inner">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                  Shipping Address
                                </h5>
                                <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                                  Payment Method
                                </h5>
                                <p className="text-gray-600 text-sm">{order.paymentMethod}</p>
                              </div>
                            </div>

                            {/* Individual Item Action Buttons */}
                            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                              <button
                                onClick={() => viewItemDetails(item, order)}
                                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                                <span className="font-medium">View Details</span>
                              </button>

                              <button
                                onClick={() => downloadInvoice(item, order.id)}
                                className="hover:cursor-pointer flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105"
                              >
                                <Download className="w-4 h-4" />
                                <span className="font-medium">Download Invoice</span>
                              </button>

                              <button
                                onClick={() => shopAgain(item)}
                                className="hover:cursor-pointer flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                <span className="font-medium">Shop Again</span>
                              </button>

                              <button
                                onClick={() => deleteItem(order.id, item.id)}
                                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 hover:cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="font-medium">Delete Item</span>
                              </button>

                              {/* Conditional rendering for show ' cancel' button for 'shipping' item and 'processing' item */}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {orders.length}
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
                <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Delivered Orders</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {orders.filter(order => order.status === 'delivered').length}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;