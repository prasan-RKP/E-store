import React from "react";

import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { SiPhonepe } from "react-icons/si";
import { FaAmazonPay } from "react-icons/fa";
import { useState, forwardRef, useImperativeHandle } from "react";
import { userAuthStore } from "../../store/authStore.js";


const PaymentForm = forwardRef(({ formData, setFormData, nextstep, isDark }, ref) => {
  const [paymentMethod, setPaymentMethod] = useState("C.O.D");
  const { saveShippingAddress2 } = userAuthStore();

  const formOnChange = (e) => {
    const { value } = e.target;
    setPaymentMethod(value);
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const formOnSubmit = async (e) => {
    e.preventDefault();
    const success = await saveShippingAddress2({ paymentMethod} );

    if (success) {
      nextstep(); // ✅ only go to next step on success
    }
  };

  // Expose formOnSubmit to parent
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      document.getElementById("payment-form").requestSubmit();
    },
  }));

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <form id="payment-form" onSubmit={formOnSubmit}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "C.O.D", name: "C.O.D (Cash On Delivery)", icon: FaHandHoldingDollar },
                { id: "googlePay", name: "G-Pay", icon: FaGooglePay },
                { id: "PhonePe", name: "PhonePe", icon: SiPhonepe },
                { id: "Paytm", name: "Paytm", icon: SiPaytm },
                { id: "AmazonPay", name: "AmazonPay", icon: FaAmazonPay },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === method.id
                    ? "border-green-500 bg-green-50"
                    : isDark
                      ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                      : "border-gray-300 bg-white  hover:bg-gray-700 text-white"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={formOnChange}
                    className="sr-only"
                  />

                  <method.icon className="text-2xl mb-2 h-10 w-10 text-green-500" />
                  <span className="text-sm font-medium">{method.name}</span>

                </label>
              ))}
            </div>
          </form>
        </div>


      </div>
    </div>
  );
});

export default PaymentForm;
