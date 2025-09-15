import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ShoppingBag, Loader, Loader2 } from "lucide-react";
import { GrGoogle } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore.js";
import { toast } from "sonner"
import "../stylesheets/custom.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { logIn, isLoggingIn } = userAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Login attempt:", formData);
    if (validForm() === true) {
      logIn(formData);
    }
  };

  const validForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email required");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Invalid Email");
      return false;
    }

    if (formData.password.length < 5) {
      toast.error("Password must be least 5 characters");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 bg-[url('/shopping-pattern.png')] bg-repeat">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl m-4"
      >
        {/* Left Side - Brand Section */}
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
          <h1 className="text-4xl font-bold mb-4 cinzel">Luxe</h1>
          <p className="text-center text-lg mb-6">
            Your one-stop destination for premium shopping experience
          </p>
          <motion.img
            src="/adjustment/illus1.png"
            alt="Shopping Illustration"
            className="w-64 h-64"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>

        {/* Right Side - Login Form */}
        <div className="card bg-base-100 shadow-xl">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="card-body"
          >
            <h2 className="card-title text-2xl font-bold text-center mb-6">
              Welcome Back!
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="flex items-center gap-2">
                  <div className="bg-base-300 p-3 rounded-lg">
                    <Mail className="text-gray-500" size={20} />
                  </div>
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

              <div className="form-control mt-4">
                <div className="flex items-center gap-2">
                  <div className="bg-base-300 p-3 rounded-lg">
                    <Lock className="text-gray-500" size={20} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full hover:shadow-md transition-shadow"
                    value={formData.password}
                    onChange={handleChange}

                  />
                </div>
                <div className="flex justify-center mt-3">
                  <a
                    className="label-text-alt link link-hover text-primary"
                    onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full mt-6 flex items-center justify-center gap-2"
                type="submit"
              >
                {isLoggingIn ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>
            <div className="divider">OR</div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline gap-2"
                onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
              >
                <GrGoogle size={20} />
                Continue with Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline gap-2"
                onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
              >
                <FaGithub size={20} />
                Continue with Github
              </motion.button>
            </div>

            <p className="text-center mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary font-semibold">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
