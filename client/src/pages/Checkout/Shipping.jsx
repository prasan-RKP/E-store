import React from "react";
import { useRef, useState } from "react";
import { FiMail, FiUser, FiPhone, FiMapPin, FiTruck, FiRefreshCw, FiClock } from "react-icons/fi";
import {motion} from 'framer-motion'

const Shipping = ({nextStep, isDark}) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  //handleInput chnage
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} ref={formRef} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <FiUser className="text-blue-500" />
            <span>Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                      : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                      : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                    : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                placeholder="@John Doe.."
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <FiMapPin className="text-blue-500" />
            <span>Shipping Address</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Street Address
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                      : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="123 Main Street"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                      : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="New York"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                      : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="NY"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isDark
                      ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                      : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                  placeholder="10001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                    : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipping Forms Ends here */}

        {/* Shipping Methods */}
        
      </form>
    </div>
  );
};

export default Shipping;
