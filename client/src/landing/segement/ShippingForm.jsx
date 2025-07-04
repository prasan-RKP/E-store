import React, { useEffect, useState } from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { userAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";
import { motion } from "framer-motion";

const ShippingForm = ({ nextstep, formData, setFormData, onShippingValid }) => {
  const {
    checkAuthVerify,
    verifiedUser,
    saveShippingAddress1,
    isSavingShippingAddress1,
  } = userAuthStore();

  useEffect(() => {
    checkAuthVerify();
  }, []);

  useEffect(() => {
    if (verifiedUser) {
      setFormData((prev) => ({
        email: verifiedUser?.email || prev.email,
        phone: verifiedUser?.contact || prev.phone,
        fullName: verifiedUser?.username || prev.fullName,
        address: verifiedUser.address || prev.address,
        city: verifiedUser?.city || prev.city,
        state: verifiedUser?.state || prev.state,
        zipCode: verifiedUser?.zipCode || prev.zipCode,
      }));
    }
  }, [verifiedUser]);

  const formOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateShippingForm = () => {
    const requiredFields = [
      "email",
      "phone",
      "fullName",
      "address",
      "city",
      "state",
      "zipCode",
    ];
    for (const field of requiredFields) {
      if (!formData[field] || !formData[field].trim() === "") {
        toast.error(`Please fill all your Credentials !`);
        return false;
      }
    }
    return true;
  };

  const formOnSubmit = async (e) => {
    e.preventDefault();

    if (validateShippingForm()) {
      const isSuccess = await saveShippingAddress1(formData);

      if (isSuccess) {
        setFormData({
          email: "",
          phone: "",
          fullName: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
        });

        onShippingValid();
        nextstep();
      }
    }
  };

  const isDark = false;

  return (
    <form onSubmit={formOnSubmit} className="space-y-8">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FiUser className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Contact Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              How can we reach you?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Email Address"
            icon={FiMail}
            name="email"
            value={formData.email}
            onChange={formOnChange}
            placeholder="john@example.com"
            type="email"
            isDark={isDark}
          />
          <InputField
            label="Phone Number"
            icon={FiPhone}
            name="phone"
            value={formData.phone}
            onChange={formOnChange}
            placeholder="+91 9876543210"
            type="tel"
            isDark={isDark}
          />
        </div>

        <InputField
          label="Full Name"
          icon={FiUser}
          name="fullName"
          value={formData.fullName}
          onChange={formOnChange}
          placeholder="John Doe"
          isDark={isDark}
        />
      </motion.div>

      {/* Shipping Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <FiMapPin className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Shipping Address
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Where should we deliver your order?
            </p>
          </div>
        </div>

        <InputField
          label="Street Address"
          icon={FiMapPin}
          name="address"
          value={formData.address}
          onChange={formOnChange}
          placeholder="123 Main Street, Apartment 4B"
          isDark={isDark}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={formOnChange}
            placeholder="New York"
            isDark={isDark}
          />
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={formOnChange}
            placeholder="NY"
            isDark={isDark}
          />
          <InputField
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={formOnChange}
            placeholder="10001"
            isDark={isDark}
            maxLength={6}
          />
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSavingShippingAddress1}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${isSavingShippingAddress1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
            } flex items-center justify-center gap-2`}
        >
          {isSavingShippingAddress1 ? (
            <>
              <TbLoader2 className="animate-spin h-5 w-5" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FiCheckCircle className="text-lg" />
              <span>Save & Continue</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </form>
  );
};

const InputField = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  isDark,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const validateField = (value, type) => {
    if (!value) return null;
    switch (type) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "tel":
        return /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ""));
      default:
        return value.length > 0;
    }
  };

  useEffect(() => {
    if (value) {
      setIsValid(validateField(value, type));
    }
  }, [value, type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label
        className="block text-sm font-semibold"
        style={{
          color: "#60a5fa",
          fontWeight: "600",
          fontSize: "1rem",
          important: "true",
        }} // #60a5fa is Tailwind's blue-400
      >
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors duration-200 ${isFocused
              ? "text-gray-700"
              : isValid === true
                ? "text-gray-600"
                : isValid === false
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${Icon ? "pl-12" : "pl-4"
            } pr-12 py-4 rounded-xl border-2 transition-all duration-200
              ${isFocused
              ? "border-gray-800 shadow-md shadow-gray-400/30 bg-white dark:bg-gray-800"
              : isValid === true
                ? "border-gray-800 shadow-md shadow-gray-300/30 dark:border-gray-400"
                : isValid === false
                  ? "border-red-500 bg-red-50/50 dark:bg-red-900/10"
                  : isDark
                    ? "border-gray-600 bg-gray-700/50 text-white hover:border-gray-500"
                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }
  ${isDark
              ? "text-white placeholder-gray-400 focus:text-gray-100"
              : "text-gray-900 placeholder-gray-500 focus:text-gray-700"
            }
  focus:outline-none focus:ring-2 focus:ring-gray-400/30 text-base`}
          placeholder={placeholder}
          {...rest}
        />
        {isValid !== null && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isValid ? (
              <FiCheckCircle className="text-gray-600 text-lg" />
            ) : (
              <FiAlertCircle className="text-red-500 text-lg" />
            )}
          </div>
        )}
      </div>

      {type === "email" && isValid === false && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <FiAlertCircle className="text-xs" />
          Please enter a valid email address
        </p>
      )}
      {type === "tel" && isValid === false && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <FiAlertCircle className="text-xs" />
          Please enter a valid phone number
        </p>
      )}
    </motion.div>
  );
};

export default ShippingForm;
