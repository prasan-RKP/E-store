import { motion } from 'framer-motion';
import { LogIn, UserRoundCheck, X, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../stylesheets/custom.css';

const AlertWindow = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card w-full max-w-[480px] bg-base-100 shadow-2xl"
      >
        <button className="btn btn-sm btn-circle absolute text-red-400 hover:bg-red-500 text-white right-3 top-3 z-10">
          <X size={18} />
        </button>
        
        <figure className="px-6 pt-8">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [-2, 2, -2]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 
            }}
            className="flex justify-center"
          >
            <img
              src="/adjustment/illus2.png"
              alt="Authentication"
              className="w-52 h-52 object-contain"
            />
          </motion.div>
        </figure>
        
        <div className="card-body items-center text-center px-8 pb-8">
          <Bell className="text-warning w-10 h-10 mb-3 animate-pulse" />
          <h2 className="card-title text-2xl font-bold mb-2">Welcome to <span className='cinzel text-green-300'>Luxe!</span></h2>
          <p className="text-base text-base-content/70 mb-6">
            Sign in to unlock exclusive features and personalized shopping experience
          </p>
          
          <div className="card-actions justify-center w-full space-y-3">
            <Link to="/signup" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full gap-2 h-12"
              >
                <LogIn size={20} />
                Sign In
              </motion.button>
            </Link>
            
            <Link to="/login" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline w-full gap-2 h-12"
              >
                <UserRoundCheck size={20} />
                Already <span className='cinzel text-green-300'>Luxe</span> Member
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AlertWindow;