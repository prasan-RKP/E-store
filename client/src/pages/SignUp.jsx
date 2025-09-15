import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  UserPlus,
  ShoppingBag,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import { GrGoogle } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore.js";
import { toast } from "sonner";

const iconHover = {
  whileHover: {
    scale: 1.2,
    rotate: 8,
    backgroundColor: "#e0e7ff", // Tailwind's indigo-100 equivalent
  },
  transition: {
    type: "spring",
    stiffness: 300,
  },
};


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
  });

  const { signUp, isSigningIn } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validForm()) signUp(formData);
  };

  const validForm = () => {
     if (!formData.username.trim()) return toast.error("username required"), false;
    if (!formData.email.trim()) return toast.error("Email required"), false;
    if (!formData.contact.trim())
      return toast.error("Contact No required"), false;
    if (!formData.password.trim())
      return toast.error("Password must be required"), false;
    if (!formData.username.trim())
      return toast.error("UserName required"), false;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email))
      return toast.error("Invalid Email"), false;
    if (formData.username.length < 8)
      return toast.error("Username must have 8 characters"), false;
    if (formData.contact.length !== 10 || isNaN(formData.contact))
      return toast.error("Contact number should be 10 digits"), false;
    if (formData.password.length < 5)
      return toast.error("Password must be at least 5 characters"), false;

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 bg-[url('/shopping-pattern.png')] bg-repeat">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl m-4"
      >
        {/* Left Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex flex-col justify-center items-center p-8 bg-primary rounded-xl text-primary-content"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, -5, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <ShoppingBag size={80} className="mb-6" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Luxe</h1>
          <p className="text-center text-lg mb-6">
            Join us for an amazing shopping experience
          </p>
          <motion.img
            src="/adjustment/illus3.png"
            alt="Shopping Illustration"
            className="w-64 h-64"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>

        {/* Right Section */}
        <div className="card bg-base-100 shadow-xl">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="card-body"
          >
            <h2 className="card-title text-2xl font-bold text-center mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="form-control">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="bg-base-300 p-3 rounded-lg"
                    {...iconHover}
                  >
                    <User className="text-gray-500" size={20} />
                  </motion.div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    className="input input-bordered w-full hover:shadow-md transition-shadow"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control mt-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="bg-base-300 p-3 rounded-lg"
                    {...iconHover}
                  >
                    <Mail className="text-gray-500" size={20} />
                  </motion.div>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="input input-bordered w-full hover:shadow-md transition-shadow"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="form-control mt-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="bg-base-300 p-3 rounded-lg"
                    {...iconHover}
                  >
                    <Phone className="text-gray-500" size={20} />
                  </motion.div>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Contact Number"
                    className="input input-bordered w-full hover:shadow-md transition-shadow"
                    value={formData.contact}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control mt-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="bg-base-300 p-3 rounded-lg"
                    {...iconHover}
                  >
                    <Lock className="text-gray-500" size={20} />
                  </motion.div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    className="input input-bordered w-full hover:shadow-md transition-shadow"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full mt-6 flex items-center justify-center gap-2"
                type="submit"
              >
                {isSigningIn ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <UserPlus size={20} />
                    Sign Up
                  </>
                )}
              </motion.button>
            </form>

            <div className="divider">OR</div>

            {/* Social Signups */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline gap-2"
                onClick={()=> toast.info("Feature Coming Soon 🔜 ...")}
              >
                <GrGoogle size={20} />
                Continue with Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline gap-2"
                onClick={()=> toast.info("Feature Coming Soon 🔜 ...")}
              >
                <FaGithub size={20} />
                Continue with Github
              </motion.button>
            </div>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;

//src="/adjustment/illus3.png"
