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
  Truck
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
  const [expandedOrder, setExpandedOrder] = useState(null);

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

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const shopAgain = (items) => {
    // Simulate adding items to cart
    alert(`Added ${items.length} items to cart for reorder!`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadInvoice = (orderId) => {
    // Simulate invoice download
    alert(`Downloading invoice for order ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                <p className="text-gray-600 mt-1">Track and manage your orders</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-blue-600 font-medium">{filteredOrders.length} Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders or products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Order #{order.id}</p>
                        <p className="text-2xl font-bold text-gray-900">₹{order.total}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="space-y-3 mb-6">
                    {order.items.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
                            <p className="text-xs text-gray-500">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => {
                              const updatedOrders = orders.map(o => {
                                if (o.id === order.id) {
                                  return {
                                    ...o,
                                    items: o.items.filter(i => i.id !== item.id),
                                    total: o.total - (item.price * item.quantity)
                                  };
                                }
                                return o;
                              });
                              setOrders(updatedOrders);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="flex items-center justify-center p-3 bg-gray-100 rounded-lg">
                        <span className="text-sm text-gray-600">+{order.items.length - 4} more items</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="border-t pt-6 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                            Shipping Address
                          </h4>
                          <p className="text-gray-600">{order.shippingAddress}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                            Payment Method
                          </h4>
                          <p className="text-gray-600">{order.paymentMethod}</p>
                        </div>
                      </div>
                      {order.estimatedDelivery !== 'N/A' && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <Truck className="w-5 h-5 mr-2 text-gray-500" />
                            Estimated Delivery
                          </h4>
                          <p className="text-gray-600">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{expandedOrder === order.id ? 'Hide Details' : 'View Details'}</span>
                    </button>
                    
                    <button
                      onClick={() => downloadInvoice(order.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Invoice</span>
                    </button>
                    
                    <button
                      onClick={() => shopAgain(order.items)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Shop Again</span>
                    </button>
                    
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivered Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(order => order.status === 'delivered').length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;