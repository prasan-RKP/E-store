import React from 'react'

const Segment = () => {
  return (
    <div>
      {/* form segment starts*/}
  <form
                          onSubmit={handleFormSubmit}
                          ref={formRef}
                          className="space-y-6"
                        >
                          {/* Contact Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                              <FiUser className="text-blue-500" />
                              <span>Contact Information</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                  Email Address
                                </label>
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
                                <label className="block text-sm font-medium">
                                  Phone Number
                                </label>
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
                                <label className="block text-sm font-medium">
                                  Username
                                </label>
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
                                  <label className="block text-sm font-medium">
                                    City
                                  </label>
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
                                  <label className="block text-sm font-medium">
                                    State
                                  </label>
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
                                  <label className="block text-sm font-medium">
                                    ZIP Code
                                  </label>
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
                                <label className="block text-sm font-medium">
                                  Country
                                </label>
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
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                              Shipping Method
                            </h3>
                            <div className="space-y-3">
                              {[
                                {
                                  id: "standard",
                                  name: "Standard Shipping",
                                  time: "5-7 business days",
                                  price: 7.99,
                                  icon: FiTruck,
                                },
                                {
                                  id: "express",
                                  name: "Express Shipping",
                                  time: "2-3 business days",
                                  price: 15.99,
                                  icon: FiRefreshCw,
                                },
                                {
                                  id: "overnight",
                                  name: "Overnight Shipping",
                                  time: "Next business day",
                                  price: 29.99,
                                  icon: FiClock,
                                },
                              ].map((method) => (
                                <motion.label
                                  key={method.id}
                                  whileHover={{ scale: 1.02 }}
                                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                    shippingMethod === method.id
                                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/20"
                                      : isDark
                                      ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                                      : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="shipping"
                                    value={method.id}
                                    checked={shippingMethod === method.id}
                                    onChange={(e) =>
                                      setShippingMethod(e.target.value)
                                    }
                                    className="sr-only"
                                  />
                                  <method.icon
                                    className={`mr-4 text-xl ${
                                      shippingMethod === method.id
                                        ? "text-blue-500"
                                        : "text-gray-400"
                                    }`}
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold">
                                        {method.name}
                                      </span>
                                      <span className="font-bold text-lg">
                                        ₹{method.price}
                                      </span>
                                    </div>
                                    <span className="text-sm opacity-75">
                                      {method.time}
                                    </span>
                                  </div>
                                </motion.label>
                              ))}
                            </div>
                          </div>
                        </form>
      {/* form segmnet ends */}
    </div>
  )
}

export default Segment
