import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle, 
  Edit3, 
  Plus,
  ChevronRight,
  Gift,
  Percent,
  Star,
  Clock
} from 'lucide-react';
import { 
  FaCreditCard, 
  FaPaypal, 
  FaGooglePay, 
  FaApplePay 
} from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ModernCheckout = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showAddAddress, setShowAddAddress] = useState(false);

  const addresses = [
    {
      id: 1,
      name: "John Doe",
      type: "Home",
      address: "123 Main Street, Apartment 4B",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true
    },
    {
      id: 2,
      name: "John Doe",
      type: "Office",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      phone: "+1 (555) 987-6543",
      isDefault: false
    }
  ];

  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      brand: "AudioTech",
      price: 299.99,
      originalPrice: 399.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      rating: 4.5,
      delivery: "Tomorrow"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      brand: "TechWear",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      rating: 4.3,
      delivery: "2 days"
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FaCreditCard },
    { id: 'upi', name: 'UPI Payment', icon: FaGooglePay },
    { id: 'wallet', name: 'Digital Wallet', icon: FaPaypal },
    { id: 'apple', name: 'Apple Pay', icon: FaApplePay }
  ];

  const offers = [
    { title: "10% Cashback", description: "Up to ₹200 on first order", code: "FIRST10" },
    { title: "Free Delivery", description: "On orders above ₹499", code: "FREEDEL" },
    { title: "Bank Offer", description: "Extra 5% off with HDFC cards", code: "HDFC5" }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-slate-800">Checkout</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
                  <span className="ml-2 text-slate-600 font-medium">Address</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">2</div>
                  <span className="ml-2 text-slate-400">Payment</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">3</div>
                  <span className="ml-2 text-slate-400">Review</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-slate-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-600 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Delivery Address</h3>
                  </div>
                  <button 
                    onClick={() => setShowAddAddress(true)}
                    className="btn btn-sm bg-white text-slate-600 border-none hover:bg-slate-100"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add New
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {addresses.map((address, index) => (
                  <motion.div
                    key={address.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddress === index 
                        ? 'border-slate-600 bg-slate-50' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedAddress(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-slate-800">{address.name}</span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{address.type}</span>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-slate-600 mb-1">{address.address}</p>
                        <p className="text-slate-600 mb-1">{address.city}</p>
                        <p className="text-slate-500 text-sm">{address.phone}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="btn btn-sm btn-ghost text-slate-600">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {selectedAddress === index && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Available Offers */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Gift className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Available Offers</h3>
                </div>
              </div>
              
              <div className="p-6">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="offers-swiper"
                >
                  {offers.map((offer, index) => (
                    <SwiperSlide key={index}>
                      <div className="bg-gradient-to-r from-slate-50 to-white p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                              <Percent className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">{offer.title}</h4>
                              <p className="text-sm text-slate-600">{offer.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-mono text-slate-700">
                              {offer.code}
                            </div>
                            <button className="text-xs text-slate-500 hover:text-slate-700 mt-1">Apply</button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-600 text-white px-6 py-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPayment === method.id 
                            ? 'border-slate-600 bg-slate-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-6 h-6 text-slate-600" />
                          <span className="font-medium text-slate-800">{method.name}</span>
                          {selectedPayment === method.id && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {selectedPayment === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Card Number" 
                        className="input input-bordered w-full focus:border-slate-600"
                      />
                      <input 
                        type="text" 
                        placeholder="Cardholder Name" 
                        className="input input-bordered w-full focus:border-slate-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className="input input-bordered w-full focus:border-slate-600"
                      />
                      <input 
                        type="text" 
                        placeholder="CVV" 
                        className="input input-bordered w-full focus:border-slate-600"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Cart Items */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-4"
            >
              <div className="bg-slate-600 text-white px-6 py-4">
                <h3 className="text-lg font-semibold">Order Summary</h3>
              </div>
              
              <div className="p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-b-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500 mb-1">{item.brand}</p>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-slate-500">{item.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-slate-800">${item.price}</span>
                          <span className="text-xs text-slate-400 line-through">${item.originalPrice}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-green-600">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{item.delivery}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between font-bold text-lg text-slate-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn bg-slate-600 hover:bg-slate-700 text-white border-none text-lg font-semibold py-3 rounded-xl mt-6"
                >
                  <Truck className="w-5 h-5 mr-2" />
                  Place Order
                </motion.button>

                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 mt-4">
                  <Shield className="w-4 h-4" />
                  <span>100% Secure & Safe Payment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddAddress && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowAddAddress(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-96 overflow-y-auto">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Add New Address</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="input input-bordered w-full focus:border-slate-600"
                    />
                    <input 
                      type="text" 
                      placeholder="Phone Number" 
                      className="input input-bordered w-full focus:border-slate-600"
                    />
                    <textarea 
                      placeholder="Address" 
                      className="textarea textarea-bordered w-full focus:border-slate-600"
                      rows={3}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="City" 
                        className="input input-bordered focus:border-slate-600"
                      />
                      <input 
                        type="text" 
                        placeholder="ZIP Code" 
                        className="input input-bordered focus:border-slate-600"
                      />
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button 
                        onClick={() => setShowAddAddress(false)}
                        className="btn flex-1 bg-slate-200 text-slate-700 border-none hover:bg-slate-300"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => setShowAddAddress(false)}
                        className="btn flex-1 bg-slate-600 text-white border-none hover:bg-slate-700"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernCheckout;