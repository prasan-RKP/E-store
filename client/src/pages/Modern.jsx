import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiCreditCard, 
  FiTruck, 
  FiUser, 
  FiLock, 
  FiChevronRight,
  FiChevronLeft,
  FiCheck,
  FiMinus,
  FiPlus,
  FiMapPin,
  FiPhone,
  FiMail,
  FiEdit3,
  FiTrash2,
  FiStar,
  FiGift,
  FiPercent
} from 'react-icons/fi';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcAmex, 
  FaCcPaypal,
  FaApplePay,
  FaGooglePay
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Modern = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 324,
      color: "Midnight Black",
      size: "Standard"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      rating: 4.6,
      reviews: 156,
      color: "Space Gray",
      size: "42mm"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 89.99,
      originalPrice: 119.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 89,
      color: "Ocean Blue",
      size: "Portable"
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    paymentMethod: 'credit-card'
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, title: "Cart Review", icon: FiShoppingCart },
    { id: 2, title: "Shipping", icon: FiTruck },
    { id: 3, title: "Payment", icon: FiCreditCard },
    { id: 4, title: "Confirmation", icon: FiCheck }
  ];

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 9.99 },
    { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 19.99 },
    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 39.99 }
  ];

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: FiCreditCard },
    { id: 'paypal', name: 'PayPal', icon: FaCcPaypal },
    { id: 'apple-pay', name: 'Apple Pay', icon: FaApplePay },
    { id: 'google-pay', name: 'Google Pay', icon: FaGooglePay }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const selectedShipping = shippingMethods.find(method => method.id === shippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const tax = (subtotal + shippingCost) * 0.08; // 8% tax
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const total = subtotal + shippingCost + tax - discount;

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': { discount: 20, type: 'fixed' },
      'WELCOME': { discount: 0.15, type: 'percentage' }
    };

    if (validCodes[promoCode]) {
      const promo = validCodes[promoCode];
      const discountAmount = promo.type === 'percentage' 
        ? subtotal * promo.discount 
        : promo.discount;
      
      setAppliedPromo({
        code: promoCode,
        discount: discountAmount,
        type: promo.type
      });
      setPromoCode('');
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const processOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  const renderCartStep = () => (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Cart</h2>
      
      {/* Product Recommendations Carousel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiGift className="mr-2 text-blue-600" />
          Frequently Bought Together
        </h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="recommendation-swiper"
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <SwiperSlide key={item}>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <img 
                  src={`https://images.unsplash.com/photo-150574042092${item}-5e560c06d30e?w=150&h=150&fit=crop`}
                  alt="Recommended product"
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h4 className="font-medium text-sm">Product Name {item}</h4>
                <p className="text-blue-600 font-semibold">$29.99</p>
                <button className="btn btn-sm btn-outline btn-primary w-full mt-2">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({item.reviews})</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Color: {item.color} | Size: {item.size}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between lg:justify-end space-x-6">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-800">${item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>
                  {item.originalPrice > item.price && (
                    <div className="text-sm text-green-600 font-medium">
                      Save ${(item.originalPrice - item.price).toFixed(2)}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="btn btn-sm btn-ghost btn-circle"
                    >
                      <FiMinus />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="btn btn-sm btn-ghost btn-circle"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="btn btn-sm btn-ghost btn-circle text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
        <h3 className="font-semibold mb-3 flex items-center">
          <FiPercent className="mr-2 text-green-600" />
          Promo Code
        </h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="input input-bordered flex-1"
          />
          <button 
            onClick={applyPromoCode}
            className="btn btn-primary"
          >
            Apply
          </button>
        </div>
        {appliedPromo && (
          <div className="mt-3 p-3 bg-green-100 rounded-lg">
            <span className="text-green-700 font-medium">
              Promo "{appliedPromo.code}" applied! You saved ${appliedPromo.discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderShippingStep = () => (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">First Name</span>
              </label>
              <input
                type="text"
                value={shippingInfo.firstName}
                onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                className="input input-bordered w-full"
                placeholder="John"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Last Name</span>
              </label>
              <input
                type="text"
                value={shippingInfo.lastName}
                onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                className="input input-bordered w-full"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                className="input input-bordered w-full pl-10"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Phone</span>
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                className="input input-bordered w-full pl-10"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Address</span>
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                className="input input-bordered w-full pl-10"
                placeholder="123 Main Street"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">City</span>
              </label>
              <input
                type="text"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                className="input input-bordered w-full"
                placeholder="New York"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">State</span>
              </label>
              <select 
                value={shippingInfo.state}
                onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                className="select select-bordered w-full"
              >
                <option value="">Select State</option>
                <option value="NY">New York</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">ZIP Code</span>
              </label>
              <input
                type="text"
                value={shippingInfo.zipCode}
                onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                className="input input-bordered w-full"
                placeholder="10001"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Country</span>
              </label>
              <select 
                value={shippingInfo.country}
                onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                className="select select-bordered w-full"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipping Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping Method</h3>
          <div className="space-y-3">
            {shippingMethods.map((method) => (
              <label key={method.id} className="cursor-pointer">
                <div className={`p-4 border-2 rounded-xl transition-all ${
                  shippingMethod === method.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="radio radio-primary"
                      />
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.time}</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">${method.price}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <h4 className="font-medium text-blue-800 mb-2">Delivery Information</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Free shipping on orders over $500</li>
              <li>• Signature required for orders over $200</li>
              <li>• We ship Monday through Friday</li>
              <li>• Tracking number provided via email</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPaymentStep = () => (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <label key={method.id} className="cursor-pointer">
                  <div className={`p-4 border-2 rounded-xl transition-all ${
                    paymentInfo.paymentMethod === method.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentInfo.paymentMethod === method.id}
                        onChange={(e) => setPaymentInfo({...paymentInfo, paymentMethod: e.target.value})}
                        className="radio radio-primary"
                      />
                      <method.icon className="w-6 h-6" />
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentInfo.paymentMethod === 'credit-card' && (
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Card Number</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    className="input input-bordered w-full pr-20"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <FaCcVisa className="w-6 h-6 text-blue-600" />
                    <FaCcMastercard className="w-6 h-6 text-red-600" />
                    <FaCcAmex className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Expiry Date</span>
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    className="input input-bordered w-full"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">CVV</span>
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    className="input input-bordered w-full"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name on Card</span>
                </label>
                <input
                  type="text"
                  value={paymentInfo.nameOnCard}
                  onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="p-4 bg-green-50 rounded-xl">
            <div className="flex items-center space-x-2 text-green-700">
              <FiLock className="w-5 h-5" />
              <span className="font-medium">Secure Payment</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {appliedPromo && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({appliedPromo.code})</span>
                <span>-${appliedPromo.discount.toFixed(2)}</span>
              </div>
            )}
            {totalSavings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Total Savings</span>
                <span>-${totalSavings.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={processOrder}
            disabled={isProcessing}
            className="btn btn-primary w-full mt-6"
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              <>
                <FiLock className="mr-2" />
                Complete Order
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderConfirmationStep = () => (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center space-y-6"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <FiCheck className="w-10 h-10 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto">
        <h3 className="font-semibold mb-4">Order Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Order Number:</span>
            <span className="font-medium">#ORD-2024-001</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Expected Delivery:</span>
            <span className="font-medium">
              {selectedShipping?.time || 'TBD'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn btn-primary">
          Track Your Order
        </button>
        <button className="btn btn-outline">
          Continue Shopping
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all ${
                    currentStep >= step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <step.icon className="w-5 h-5" />
                    <span className="font-medium whitespace-nowrap">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <FiChevronRight className="w-5 h-5 text-gray-400 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && renderCartStep()}
              {currentStep === 2 && renderShippingStep()}
              {currentStep === 3 && renderPaymentStep()}
              {currentStep === 4 && renderConfirmationStep()}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="bg-gray-50 px-6 py-4 lg:px-8 flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn btn-outline"
              >
                <FiChevronLeft className="mr-2" />
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next
                  <FiChevronRight className="ml-2" />
                </button>
              ) : (
                <div className="text-sm text-gray-600">
                  Click "Complete Order" to finish
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary Sidebar for Mobile */}
        {currentStep < 4 && (
          <div className="lg:hidden mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Modern;