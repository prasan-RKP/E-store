import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TbLoader2 } from "react-icons/tb";
import { toast } from "sonner";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Bell,
  Edit,
  Camera,
  CreditCard,
  MapPin,
  Package,
  Clock,
  Home,
  ShoppingCart,
  Search,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Loader,
  Phone,
  Trash,
  Loader2,
  Globe,
  HeartCrack,
  Mail,
} from "lucide-react";
import { userAuthStore } from "../store/authStore.js";
import { GoPackage } from "react-icons/go";
import { useOrderStore } from "../store/OrderStore.js";
import { FaLinkedin } from "react-icons/fa";
import OrderListLoader from "../skeletons/OrderListSkeleton.jsx";
import WishlistSkeleton from "../skeletons/WishlistSkeleton.jsx";
import OrderListSkeleton from "../skeletons/OrderListSkeleton.jsx";


const ProfilePage = () => {
  // userAuthStore access here --->
  // Authstores values
  const {
    logout,
    verifiedUser,
    checkAuthVerify,
    isSavingChanges,
    saveChange,
    showWishListItem,
    removeWishListProd,
    moveToAddCart,
    isShowingWishlistItem
  } = userAuthStore();
  // OrderStore values

  const { order, orderItemLength, fetchOrder, isFetchingOrder } = useOrderStore();

  const MotionLink = motion(Link);


  const naviagte = useNavigate();
  const [allOrderItems, setAllOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [length, setLength] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [storeProdId, setStoreProdId] = useState(null);
  const [wishItems, setWishItems] = useState([]);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [orgOrders, setOrgOrders] = useState([]);
  const [wishLength, setWishLength] = useState('');


  useEffect(() => {
    setCartCount(verifiedUser?.cart?.length);
  }, [verifiedUser?.cart])
  // To set the totalOrder length -> functionality 
  // Todo: Tommorow
  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrder();
    };
    loadOrders();
  }, [fetchOrder]);

  // re-defined for orders
  useEffect(() => {
    if (order?.orders?.length > 0) {
      // flatten all items from all orders
      const allItems = order.orders.flatMap(ord => ord.items || []);
      setOrgOrders(allItems);
    } else {
      setOrgOrders([]); // reset if no orders
    }
  }, [order]);

  // setting the length of 'orders' for 
  useEffect(() => {
    setLength(orderItemLength || 0);
  }, [orgOrders])

  useEffect(() => {
    setWishLength(verifiedUser?.wishlist?.length);
  }, [verifiedUser?.wishlist])



  const [profileInfo, setProfileInfo] = useState({
    username: verifiedUser?.username || "@john Doe",
    email: verifiedUser?.email || "ex@gmail.com",
    address: verifiedUser?.address || "San Francisco, CA",
    contact: verifiedUser?.contact || "+91 995....8",
  });

  // Helper function to format dates instead of using moment
  const formatDate = (dateString, format) => {
    const date = new Date(dateString);

    if (format === "MMMM YYYY") {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    if (format === "MMM D, YYYY") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${months[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
    }

    return date.toLocaleDateString();
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditBio = () => {
    setIsEditingBio(!isEditingBio);
  };

  // FORM-> Validation 
  // profile updation valid form
  const validForm = () => {
    const { email, username, contact, address } = profileInfo;

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!username.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (username.length > 36) {
      toast.error("Username must not exceed 36 characters");
      return false;
    }

    if (!contact.trim()) {
      toast.error("Contact number is required");
      return false;
    }

    if (!address.trim()) {
      toast.error("Address is required");
      return false;
    }

    if (address.length < 10) {
      toast.error("Address must be at least 10 characters long");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (contact.length !== 10 || !/^\d{10}$/.test(contact)) {
      toast.error("Contact number must be exactly 10 digits");
      return false;
    }

    return true;
  };

  // update profile code
  const updateProfile = (e) => {
    e.preventDefault();
    if (validForm() === true) {
      setProfileUpdated((prev) => !prev);
      saveChange(profileInfo);
    } else {
      toast.error("Something went wrong...");
    }
    setIsEditing(false);
    // In a real app, you would save the changes to the backend here
  };



  // Sync local orders state with global store


  useEffect(() => {
    checkAuthVerify();
  }, [checkAuthVerify, profileUpdated]);

  // updating profile  form funtionality ..

  useEffect(() => {
    const fetchWishlist = async () => {
      await showWishListItem();
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (verifiedUser?.wishlist) {
      setWishItems(verifiedUser?.wishlist);
    }
  }, [verifiedUser?.wishlist]);

  // WishlIst Items from backend


  // Remove the WishItems
  const removeWishItem = async (id) => {
    setStoreProdId(id);
    await removeWishListProd({ pid: id });
    setStoreProdId(null);
  };

  // Moving the productTo Cart
  const handleMoveToCart = async (id, size) => {
    setCartId(id);
    await moveToAddCart({ productId: id, size });
    setCartId(null);
    //toast.success("Product moved to Cart ✅");
  };

  //status Styles for coloring 
  const getStatusStyles = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered': return 'bg-green-900/50 text-green-400';
      case 'shipped': return 'bg-blue-900/50 text-blue-400';
      case 'processing': return 'bg-yellow-900/50 text-yellow-400';
      case 'cancelled': return 'bg-red-600/90 text-white';
      default: return 'bg-gray-600/50 text-gray-300';
    }
  };

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          onSubmit={updateProfile}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              value={profileInfo?.username}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, username: e.target.value })
              }
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={profileInfo?.email}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, email: e.target.value })
              }
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Contact</label>
            <input
              type="tel"
              value={profileInfo?.contact}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, contact: e.target.value })
              }
              maxLength={10}
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Location</label>
            <input
              type="text"
              value={profileInfo.address}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, address: e.target.value })
              }
              className="input input-bordered w-full bg-gray-700 text-white"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-sm text-gray-300 bg-red-500"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              {isSavingChanges ? (
                <span className="flex items-center space-x-2">
                  <span>Saving...</span>
                  <TbLoader2 className="h-5 w-5 animate-spin" />
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </motion.form>
      );
    }

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative w-28 h-28">
            <img
              src={
                verifiedUser?.profilePic ||
                "https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg?ga=GA1.1.609031703.1716957572&semt=ais_hybrid&w=740"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 bg-gray-500"
            />
            <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-indigo-600 p-2 rounded-full text-white">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">
              {verifiedUser?.username || "john Doe"}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <Mail size={14} />
              <span>{verifiedUser?.email || "morgan@example.com"}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <Phone size={14} />
              <span>{verifiedUser?.contact || "+91 998*******"}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <MapPin size={14} />
              <span>
                {verifiedUser?.address || "Google, AB-21, sec-unknown"}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              👤 Joined On{" "}
              {new Date(verifiedUser?.createdAt).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <button
            onClick={handleEdit}
            className="btn btn-outline btn-sm text-indigo-400 border-indigo-400 hover:bg-indigo-900 hover:border-indigo-400"
          >
            <Edit size={16} className="mr-1" /> Edit Profile
          </button>
        </div>

        <div className="divider my-6"></div>

        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-400">
              Your Details 🛍️
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="stat bg-gray-900 rounded-xl p-4 border border-gray-700"
          >
            <div className="stat-figure text-indigo-400">
              <Package size={24} />
            </div>
            <div className="stat-title text-gray-400">Total Orders</div>
            <div className="stat-value text-indigo-400">
              {length}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="stat bg-gray-900 rounded-xl p-4 border border-gray-700"
          >
            <div className="stat-figure text-pink-400">
              <Heart size={24} />
            </div>
            <div className="stat-title text-gray-400">Wishlist Items</div>
            <div className="stat-value text-pink-400">{wishItems?.length}</div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  //   updated Orders Content 
  const renderOrdersContent = () => {
    if (isFetchingOrder) {
      return (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-4"
        >
          <h3 className="text-center text-lg font-semibold text-gray-200 mb-4">
            Loading Orders...
          </h3>
          <OrderListSkeleton />
        </motion.div>
      );
    }

    if (!orgOrders || orgOrders.length === 0) {
      return (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-4"
        >
          <h3 className="text-center text-lg font-semibold text-gray-200 mb-4">
            No Orders Available ☹️ ...
          </h3>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <h3 className="text-center text-lg font-semibold text-gray-200 mb-4">
          Order History 🛍️
        </h3>

        {/* Scrollable Orders list */}
        <div className="h-[500px] overflow-y-auto pr-2 space-y-4">
          {orgOrders.map((order, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center justify-between"
            >
              <Link to={`/productshow/${order?.pid}`}>
                <div className="flex items-center gap-4">
                  <img
                    src={order?.image}
                    alt={order?.name}
                    className="hover:cursor-pointer w-16 h-16 rounded-md object-cover border border-gray-700"
                  />
                  <div>
                    <h4 className="font-medium text-white">{order?.name}</h4>
                    <p className="text-sm text-gray-400">
                      {order?.orderDate || "NA"}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-6 mt-3 md:mt-0">
                <div>
                  <span className="text-gray-400 text-sm">Amount</span>
                  <p className="font-medium text-white">
                    ₹{order?.price || "NA"}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {order?.status}
                  </span>
                </div>

                <Link to={"/showorder"}>
                  <button className="btn btn-outline btn-xs">Details</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };


  // Updated "WISHLIST ❤️" code
  const renderWishlistContent = () => {
    if (isShowingWishlistItem) {
      return <WishlistSkeleton />;
    }

    if (!wishItems || wishItems.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">
            No WishItems Available Now ☹️
          </h3>
          <Link
            to="/addtowishlist"
            className="inline-block px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/80 transition"
          >
            Add Items to Wishlist
          </Link>
        </div>
      );
    }

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-center text-gray-200 mb-8">
          WishListItems ❤️
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
          {wishItems?.map((item, index) => (
            <motion.div
              key={item?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/productshow/${item?.productId}`}>
                  <img
                    src={item?.product?.img}
                    alt={item.name}
                    className="w-full sm:w-44 h-44 rounded-md object-cover border border-gray-700"
                  />
                </Link>
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-white">
                      {item?.product?.name}
                    </h4>
                    <p className="text-indigo-400 font-medium">
                      ₹{item?.product?.price}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4 sm:mt-2">
                    <button
                      onClick={() =>
                        handleMoveToCart(item?.product?._id, item?.size)
                      }
                      className="btn btn-primary btn-sm hover:bg-blue-800"
                    >
                      {cartId === item?.product?._id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>AddToCart</>
                      )}
                    </button>
                    <button
                      onClick={() => removeWishItem(item?.product?._id)}
                      className="btn btn-outline btn-sm border-red-500 text-red-400"
                    >
                      {storeProdId === item?.product?._id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash size={16} fill="#f472b6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };


  const tabContent = {
    profile: renderProfileContent(),
    orders: renderOrdersContent(),
    wishlist: renderWishlistContent(),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-2xl font-bold">
                Lu<span className="text-red-600">Xe</span>
              </h1>

              <div className="hidden md:flex ml-10 space-x-6">
                <MotionLink
                  to="/"
                  whileHover={{ y: -2 }}
                  className="flex items-center text-gray-300 hover:text-white px-2"
                >
                  <Home size={18} className="mr-1" />
                  <span>Home</span>
                </MotionLink>

                <MotionLink
                  to="/#products"
                  whileHover={{ y: -2 }}
                  className="flex items-center text-gray-300 hover:text-white px-2"
                >
                  <Package size={18} className="mr-1" />
                  <span>Go to Shop</span>
                </MotionLink>

                <MotionLink
                  to="/#seller"
                  whileHover={{ y: -2 }}
                  className="flex items-center text-gray-300 hover:text-white px-2"
                >
                  <Search size={18} className="mr-1" />
                  <span>Collection</span>
                </MotionLink>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Link to={"/addtocart"}>
                  <ShoppingCart
                    size={24}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  />
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Link to={"/showorder"}>
                  <GoPackage
                    size={24}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  />
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                    {length}
                  </span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Link to={"/addToWishlist"}>
                  <HeartCrack
                    size={24}
                    className="text-pink-500 hover:text-white cursor-pointer"
                  />
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                    {wishLength}
                  </span>
                </Link>
              </motion.div>
              {/* nav Profile Image */}

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-300 hover:text-white"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X size={24} className="text-red-500" /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile navigation menu */}
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden py-3 border-t border-gray-700"
            >
              <Link
                to="/"
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                <Home size={16} className="inline mr-2" /> Home
              </Link>
              <Link
                to="/addtocart"
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                <ShoppingCart size={16} className="inline mr-2" /> Cart
              </Link>
              <Link
                to="/wishlist"
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                <Heart size={16} className="inline mr-2" /> wishList
              </Link>
              {/* to="/#products" */}
              <Link
                to="/#products"
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                <Package size={16} className="inline mr-2" /> Orders
              </Link>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="hover:cursor-pointer flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-red-500"
                onClick={logout}
              >
                <span className="mr-1.5">
                  <LogOut size={18} />
                </span>
                <span className="font-medium">Sign Out</span>
              </motion.button>

            </motion.div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700"
        >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar - Hidden on mobile, shown as tabs */}
            <div className="hidden md:block md:w-80 bg-gray-900 p-6">
              <h1 className="text-2xl font-bold mb-8 text-center">
                My Account
              </h1>

              <nav className="space-y-2">
                {[
                  { id: "profile", name: "Profile", icon: <User size={18} /> },
                  {
                    id: "orders",
                    name: "Orders",
                    icon: <ShoppingBag size={18} />,
                  },
                  {
                    id: "wishlist",
                    name: "Wishlist",
                    icon: <Heart size={18} />,
                  },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === tab.id
                      ? "bg-indigo-900/40 text-indigo-400"
                      : "hover:bg-gray-800 text-gray-400"
                      }`}
                  >
                    <motion.span
                      variants={slideIn}
                      initial="hidden"
                      animate="visible"
                      className="mr-3"
                    >
                      {tab.icon}
                    </motion.span>
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                ))}

                <div className="divider my-4"></div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="hover:cursor-pointer flex items-center w-full p-3 rounded-lg text-gray-400 hover:bg-red-500"
                  onClick={logout}
                >
                  <span className="mr-3">
                    <LogOut size={18} />
                  </span>
                  <span className="font-medium">Sign Out</span>
                </motion.button>
              </nav>
            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden bg-gray-900 p-2 overflow-x-auto whitespace-nowrap">
              {[
                { id: "profile", name: "Profile", icon: <User size={16} /> },
                {
                  id: "orders",
                  name: "Orders",
                  icon: <ShoppingBag size={16} />,
                },
                { id: "wishlist", name: "Wishlist", icon: <Heart size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center px-4 py-2 mr-2 rounded-lg ${activeTab === tab.id
                    ? "bg-indigo-900/40 text-indigo-400"
                    : "text-gray-400"
                    }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8">{tabContent[activeTab]}</div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 bg-slate-900 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h1 className="text-white text-2xl font-bold">
                Lu<span className="text-red-600">Xe</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Your one-stop destination for trendy fashion items and
                accessories. Discover unique pieces from top designers and
                sustainable brands.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to={"/#contact"}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Contact 📞
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addtocart"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Go to Cart 🍞
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#products"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Go to Shop 🛍️
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <span onClick={logout} className="text-red-500">SignOut</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a href="https://github.com/prasan-RKP" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                  <Github className="h-5 w-5 text-green-300" />
                </a>
                <a href="https://www.linkedin.com/in/prasan-kumar-05a623345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                  <FaLinkedin className="h-5 w-5 text-blue-600" />
                </a>
                <a href="https://prasan.onrender.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                  <Globe className="h-5 w-5 text-violet-400" />
                </a>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-sm">
                  Subscribe to our newsletter
                </p>
                <div className="flex mt-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="input input-bordered input-sm bg-gray-700 text-white flex-1"
                  />
                  <button onClick={() => toast.info("Feature Coming Soon 🔜 ...")} className="btn btn-primary btn-sm ml-2">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="divider my-6"></div>

          <div className="text-center text-gray-500 text-sm">
            © 2025 Luxe. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
