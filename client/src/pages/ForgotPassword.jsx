import { Loader, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { IoMdLogIn } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("E-mail is required");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const res = await axiosInstance.post("/forgot-password", { email });
      
      if (res.data && res.data.token) {
        toast.success("Password reset link generated! Redirecting...");
        setEmail(""); // Clear the form
        
        // Redirect to reset-password page after 500ms
        setTimeout(() => {
          navigate(`/reset-password/${res.data.token}`);
        }, 500);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg || error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-10 shadow-xl bg-gray-800 border border-gray-700 rounded-2xl min-h-[350px] flex flex-col justify-center"
      >
        <div className="text-center text-white text-2xl font-semibold mb-8 flex items-center justify-center">
          Forgot Password <IoMdLogIn className="ml-2" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0"
                autoComplete="email"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-3 bg-primary text-white rounded hover:bg-primary/80 transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" color="white" size={20} />
                  <span>Processing...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-green-500 underline hover:text-green-600 transition-colors duration-200"
              >
                Back to LogIn
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;