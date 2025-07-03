import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, LogOut, Bell, Edit, Camera, CreditCard, MapPin, Package, Clock, Home, ShoppingCart, Search, Instagram, Linkedin, Github, Twitter, Facebook } from 'lucide-react';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [profileData, setProfileData] = useState({
    name: 'Alexandra Morgan',
    email: 'alex.morgan@example.com',
    joined: '2022-05-15',
    avatarUrl: '/api/placeholder/150/150',
    bio: 'Fashion enthusiast and minimalist design lover. Always looking for sustainable brands and unique pieces.',
    location: 'San Francisco, CA',
    orders: [
      { 
        id: '#ORD-7291', 
        date: '2025-03-28', 
        status: 'Delivered', 
        amount: 129.99,
        image: '/api/placeholder/100/100',
        productName: 'Premium Leather Jacket'
      },
      { 
        id: '#ORD-6845', 
        date: '2025-03-15', 
        status: 'Shipped', 
        amount: 89.50,
        image: '/api/placeholder/100/100',
        productName: 'Casual Denim Shirt'
      },
      { 
        id: '#ORD-5721', 
        date: '2025-02-27', 
        status: 'Delivered', 
        amount: 235.75,
        image: '/api/placeholder/100/100',
        productName: 'Designer Sunglasses'
      },

      {
        id: '#ORD-WE235', 
        date: '2025-02-27', 
        status: 'rejected', 
        amount: 245.75,
        image: '/api/placeholder/100/100',
        productName: 'Sunglasses cafe'
      },
      {
        id: '#ORD-WE235', 
        date: '2025-02-27', 
        status: 'rejected', 
        amount: 245.75,
        image: '/api/placeholder/100/100',
        productName: 'Sunglasses cafe'
      },
      {
        id: '#ORD-WE235', 
        date: '2025-02-27', 
        status: 'rejected', 
        amount: 245.75,
        image: '/api/placeholder/100/100',
        productName: 'Sunglasses cafe'
      },
      
      
      
    ],
    wishlist: [
      { 
        id: 1, 
        name: 'Minimalist Watch', 
        price: 149.99,
        image: '/api/placeholder/200/200'
      },
      { 
        id: 2, 
        name: 'Organic Cotton Sweater', 
        price: 89.99,
        image: '/api/placeholder/200/200'
      },
      { 
        id: 3, 
        name: 'Leather Crossbody Bag', 
        price: 119.99,
        image: '/api/placeholder/200/200'
      }
    ],
    paymentMethods: [
      { id: 1, type: 'Visa', last4: '4242', expiry: '09/26' },
      { id: 2, type: 'Mastercard', last4: '8123', expiry: '12/25' }
    ]
  });
  
  // Helper function to format dates instead of using moment
  const formatDate = (dateString, format) => {
    const date = new Date(dateString);
    
    if (format === 'MMMM YYYY') {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    if (format === 'MMM D, YYYY') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    
    return date.toLocaleDateString();
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };
  
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  const updateProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, you would save the changes to the backend here
  };
  
  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <motion.form 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          onSubmit={updateProfile}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Name</label>
            <input 
              type="text" 
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Email</label>
            <input 
              type="email" 
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Location</label>
            <input 
              type="text" 
              value={profileData.location}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Bio</label>
            <textarea 
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              className="textarea textarea-bordered w-full bg-gray-700 text-white h-24"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-outline btn-sm text-gray-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-primary btn-sm"
            >
              Save Changes
            </button>
          </div>
        </motion.form>
      );
    }
    
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative">
            <img 
              src={profileData.avatarUrl} 
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600"
            />
            <button className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white">
              <Camera size={16} />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
            <p className="text-gray-400">{profileData.email}</p>
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <MapPin size={14} />
              <span>{profileData.location}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Member since {formatDate(profileData.joined, 'MMMM YYYY')}
            </p>
          </div>
          
          <button 
            onClick={handleEdit}
            className="btn btn-outline btn-sm text-indigo-400 border-indigo-400 hover:bg-indigo-900 hover:border-indigo-400"
          >
            <Edit size={16} className="mr-1" /> Edit Profile
          </button>
        </div>
        
        <div className="divider my-6"></div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">About Me</h3>
          <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="stat bg-gray-900 rounded-xl p-4 border border-gray-700"
          >
            <div className="stat-figure text-indigo-400">
              <Package size={24} />
            </div>
            <div className="stat-title text-gray-400">Total Orders</div>
            <div className="stat-value text-indigo-400">{profileData.orders.length}</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="stat bg-gray-900 rounded-xl p-4 border border-gray-700"
          >
            <div className="stat-figure text-pink-400">
              <Heart size={24} />
            </div>
            <div className="stat-title text-gray-400">Wishlist Items</div>
            <div className="stat-value text-pink-400">{profileData.wishlist.length}</div>
          </motion.div>
        </div>
      </motion.div>
    );
  };
  
  const renderOrdersContent = () => {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4 overflow-auto"
      >
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Order History</h3>
        
        {profileData.orders.map((order, index) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img 
                src={order.image} 
                alt={order.productName}
                className="w-16 h-16 rounded-md object-cover border border-gray-700"
              />
              <div>
                <h4 className="font-medium text-white">{order.id}</h4>
                <p className="text-sm text-indigo-300">{order.productName}</p>
                <p className="text-sm text-gray-400">{formatDate(order.date, 'MMM D, YYYY')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mt-3 md:mt-0">
              <div>
                <span className="text-gray-400 text-sm">Amount</span>
                <p className="font-medium text-white">${order.amount}</p>
              </div>
              
              <div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  order.status === 'Delivered' ? 'bg-green-900/50 text-green-400' : 
                  order.status === 'Shipped' ? 'bg-blue-900/50 text-blue-400' : 
                  'bg-yellow-900/50 text-yellow-400'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <button className="btn btn-outline btn-xs">Details</button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };
  
  const renderWishlistContent = () => {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Your Wishlist</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileData.wishlist.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 rounded-md object-cover border border-gray-700"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-white">{item.name}</h4>
                    <p className="text-indigo-400 font-medium">${item.price}</p>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <button className="btn btn-primary btn-sm">Add to Cart</button>
                    <button className="btn btn-outline btn-sm text-pink-400 border-pink-400 hover:bg-pink-900/30">
                      <Heart size={16} fill="#f472b6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };
  
  const renderPaymentContent = () => {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Payment Methods</h3>
        
        {profileData.paymentMethods.map((method, index) => (
          <motion.div 
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {method.type === 'Visa' ? (
                <div className="bg-blue-800 rounded p-2 text-white font-bold text-sm">VISA</div>
              ) : (
                <div className="bg-red-800 rounded p-2 text-white font-bold text-sm">MC</div>
              )}
              <div>
                <p className="text-white">•••• {method.last4}</p>
                <p className="text-sm text-gray-400">Expires {method.expiry}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="btn btn-outline btn-xs">Edit</button>
              <button className="btn btn-outline btn-error btn-xs">Remove</button>
            </div>
          </motion.div>
        ))}
        
        <button className="btn btn-outline w-full mt-4">
          <CreditCard size={16} className="mr-2" /> Add New Payment Method
        </button>
      </motion.div>
    );
  };
  
  const tabContent = {
    profile: renderProfileContent(),
    orders: renderOrdersContent(),
    wishlist: renderWishlistContent(),
    payment: renderPaymentContent(),
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-400">StyleShop</h1>
              
              <div className="hidden md:flex ml-10 space-x-6">
                <motion.a 
                  whileHover={{ y: -2 }}
                  className="flex items-center text-gray-300 hover:text-white px-2"
                  href="#"
                >
                  <Home size={18} className="mr-1" />
                  <span>Home</span>
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2 }}
                  className="flex items-center text-gray-300 hover:text-white px-2"
                  href="#"
                >
                  <Package size={18} className="mr-1" />
                  <span>Products</span>
                </motion.a>
                <motion.a 
                  whileHover={{ y: -2 }}
                  className="flex items-center text-gray-300 hover:text-white px-2"
                  href="#"
                >
                  <Search size={18} className="mr-1" />
                  <span>Search</span>
                </motion.a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <ShoppingCart size={20} className="text-gray-300 hover:text-white cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <Bell size={20} className="text-gray-300 hover:text-white cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-pink-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                  2
                </span>
              </motion.div>
              
              <img 
                src={profileData.avatarUrl} 
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700"
        >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-72 bg-gray-900 p-6">
              <h1 className="text-2xl font-bold mb-8 text-center">My Account</h1>
              
              <nav className="space-y-2">
                {[
                  { id: 'profile', name: 'Profile', icon: <User size={18} /> },
                  { id: 'orders', name: 'Orders', icon: <ShoppingBag size={18} /> },
                  { id: 'wishlist', name: 'Wishlist', icon: <Heart size={18} /> },
                  { id: 'payment', name: 'Payment Methods', icon: <CreditCard size={18} /> },
                  { id: 'settings', name: 'Settings', icon: <Settings size={18} /> }
                ].map(tab => (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === tab.id ? 
                      'bg-indigo-900/40 text-indigo-400' : 
                      'hover:bg-gray-800 text-gray-400'
                    }`}
                  >
                    <motion.span 
                      variants={slideIn}
                      initial="hidden"
                      animate="visible"
                      className="mr-3"
                    >
                      {tab.icon}
                    </motion.span>
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                ))}
                
                <div className="divider my-4"></div>
                
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center w-full p-3 rounded-lg text-gray-400 hover:bg-gray-800"
                >
                  <span className="mr-3"><LogOut size={18} /></span>
                  <span className="font-medium">Log Out</span>
                </motion.button>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8">
              {tabContent[activeTab]}
            </div>
          </div>
        </motion.div>
        
        {/* Footer */}
        <div className="mt-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">StyleShop</h3>
              <p className="text-gray-400 text-sm">
                Your one-stop destination for trendy fashion items and accessories.
                Discover unique pieces from top designers and sustainable brands.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <motion.a 
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-indigo-400 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-indigo-400 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-indigo-400 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-indigo-400 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-sm">Subscribe to our newsletter</p>
                <div className="flex mt-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="input input-bordered input-sm bg-gray-700 text-white flex-1"
                  />
                  <button className="btn btn-primary btn-sm ml-2">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="divider my-6"></div>
          
          <div className="text-center text-gray-500 text-sm">
            © 2025 StyleShop. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;