import { Loader, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { IoMdLogIn } from "react-icons/io";
import { Link, useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance.js";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!newPassword.trim()) {
      toast.error("New password is required");
      return false;
    }
    
    if (newPassword.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return false;
    }
    
    if (!confirmPassword.trim()) {
      toast.error("Please confirm your password");
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const res = await axiosInstance.post(`/reset-password/${token}`, {
        newPassword
      });
      
      console.log("Reset password response:", res.data);
      
      if (res.status === 200) {
        toast.success("Password reset successfully ✅");
        setNewPassword("");
        setConfirmPassword("");
        
        // Use a slightly longer timeout to ensure toast is visible
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 300);
      }
      
    } catch (error) {
      console.error("Reset password error:", error);
      
      if (error.response) {
        const errorMsg = error.response.data.msg || error.response.data.message;
        toast.error(errorMsg);
        console.log("Error response data:", error.response.data);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
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
          Reset Password <IoMdLogIn className="ml-2" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0"
                disabled={isSubmitting}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:border-primary focus:ring-0"
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
                "Reset Password"
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

export default ResetPassword;