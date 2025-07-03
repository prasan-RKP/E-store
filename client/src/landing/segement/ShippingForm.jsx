import React, { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { userAuthStore } from "../../store/authStore";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";

const ShippingForm = ({ nextstep, formData, setFormData, onShippingValid }) => {
  const {
    checkAuthVerify,
    verifiedUser,
    saveShippingAddress1,
    isSavingShippingAddress1,
  } = userAuthStore();

  /* const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  */

  useEffect(() => {
    checkAuthVerify();
  }, []);

  //console.log("Verified User:", verifiedUser);

  // Auto-fill form when verifiedUser is ready
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

  // validation the form for check that every field filledUP
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

  const isDark = false; // You can replace this with props or state if needed

  return (
    <form onSubmit={formOnSubmit} className="space-y-6">
      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiUser className="text-blue-500" />
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Email"
            icon={FiMail}
            name="email"
            value={formData.email}
            onChange={formOnChange}
            placeholder="john@example.com"
            type="email"
            isDark={isDark}
          />
          <InputField
            label="Phone"
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
          name="fullName"
          value={formData.fullName}
          onChange={formOnChange}
          placeholder="John Doe"
          isDark={isDark}
        />
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiMapPin className="text-blue-500" />
          Shipping Address
        </h3>

        <InputField
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={formOnChange}
          placeholder="123 Main Street"
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
      </div>

      <button
        type="submit"
        className="hover:cursor-pointer mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        {isSavingShippingAddress1 ? (
          <div className="flex items-center justify-center gap-2">
            <TbLoader2 className="animate-spin h-7 w-7 " />
          </div>
        ) : (
          "Save & Continue"
        )}
      </button>
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
}) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${
          Icon ? "pl-10" : "pl-4"
        } pr-4 py-3 rounded-lg border ${
          isDark
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-300 bg-white text-black"
        } focus:border-blue-500 focus:outline-none`}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  </div>
);

export default ShippingForm;
