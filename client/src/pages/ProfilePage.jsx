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
} from "lucide-react";
import { userAuthStore } from "../store/authStore.js";
//import {toast} from 'sonner';

const ProfilePage = () => {
  // userAuthStore access here --->
  const {
    logout,
    verifiedUser,
    checkAuthVerify,
    isSavingChanges,
    saveChange,
    showWishListItem,
    removeWishListProd,
    moveToAddCart,
  } = userAuthStore();

  const MotionLink = motion(Link);

  // console.log('verifedUser', verifiedUser);

  const naviagte = useNavigate();
  const [cartId, setCartId] = useState(null);
  const [storeProdId, setStoreProdId] = useState(null);
  const [wishItems, setWishItems] = useState([]);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alexandra Morgan",
    email: "alex.morgan@example.com",
    constact: "7735452856",
    joined: "2022-05-15",
    avatarUrl: "/api/placeholder/150/150",
    bio: "Fashion enthusiast and minimalist design lover. Always looking for sustainable brands and unique pieces.",
    location: "San Francisco, CA",
    orders: [
      {
        id: "#ORD-7291",
        date: "2025-03-28",
        status: "Delivered",
        amount: 129.99,
        image: "/man1.jpg",
        productName: "Premium Leather Jacket",
      },
      {
        id: "#ORD-6845",
        date: "2025-03-15",
        status: "Shipped",
        amount: 89.5,
        image: "/man2.jpg",
        productName: "Casual Denim Shirt",
      },
      {
        id: "#ORD-5721",
        date: "2025-02-27",
        status: "Delivered",
        amount: 235.75,
        image: "/api/placeholder/120/120",
        productName: "Designer Sunglasses",
      },
      {
        id: "#ORD-4982",
        date: "2025-02-12",
        status: "Delivered",
        amount: 67.25,
        image: "/api/placeholder/120/120",
        productName: "Cotton T-shirt Set",
      },
      {
        id: "#ORD-4215",
        date: "2025-01-30",
        status: "Delivered",
        amount: 149.99,
        image: "/api/placeholder/120/120",
        productName: "Winter Boots",
      },
      {
        id: "#ORD-3789",
        date: "2025-01-18",
        status: "Delivered",
        amount: 79.5,
        image: "/api/placeholder/120/120",
        productName: "Casual Jeans",
      },
      {
        id: "#ORD-2954",
        date: "2024-12-27",
        status: "Delivered",
        amount: 225.0,
        image: "/api/placeholder/120/120",
        productName: "Designer Dress",
      },
    ],
    paymentMethods: [
      { id: 1, type: "Visa", last4: "4242", expiry: "09/26" },
      { id: 2, type: "Mastercard", last4: "8123", expiry: "12/25" },
    ],
  });

  // Authstores values

  const [profileInfo, setProfileInfo] = useState({
    username: verifiedUser?.username || "@john Doe",
    email: verifiedUser?.email || "ex@gmail.com",
    address: verifiedUser?.address || "San Francisco, CA",
    contact: verifiedUser?.contact || "+91 995....8",
  });

  //checkAtuhVerify
  // userAuthStore.js

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
      setWishItems(verifiedUser.wishlist);
    }
  }, [verifiedUser?.wishlist]);
  //console.log("WishItems", verifiedUser);
  // WishlIst Items from backend

  // Remove the WishItems
  const removeWishItem = async (id) => {
    setStoreProdId(id);
    await removeWishListProd({ pid: id });
    setStoreProdId(null);
  };

  // Moving the productTo Cart
  const handleMoveToCart = async (id, size) => {
    //console.log(`Getting the prodId:${id}, size:${size}`);
    setCartId(id);
    await moveToAddCart({ productId: id, size });
    setCartId(null);
    //toast.success("Product moved to Cart ✅");
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
              value={profileInfo.username}
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
              value={profileInfo.email}
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
              value={profileInfo.contact}
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
              className="btn btn-outline btn-sm text-gray-300"
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
                verifiedUser.profilePic ||
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
              {verifiedUser.username || "john Doe"}
            </h2>
            <p className="text-gray-400">
              {verifiedUser.email || "morgan@example.com"}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <Phone size={14} />
              <span>{verifiedUser.contact || "+91 998*******"}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <MapPin size={14} />
              <span>
                {verifiedUser.address || "Google, AB-21, sec-unknown"}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Member since{" "}
              {new Date(verifiedUser.createdAt).toLocaleString("default", {
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
              {verifiedUser?.cart?.length}
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

  //   uto
  const renderOrdersContent = () => {
    const displayOrders = showAllOrders
      ? profileData.orders
      : profileData.orders.slice(0, 3);

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-200 mb-4">
          Order History
        </h3>

        {/* Fixed height scrollable container */}
        <div className="h-[500px] overflow-y-auto pr-2 space-y-4">
          <h2 className="text-primary text-center">Coming Soon ...</h2>
        </div>

        {profileData.orders.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllOrders(!showAllOrders)}
              className="btn btn-outline btn-sm text-indigo-400 border-indigo-400 hover:bg-indigo-900 hover:border-indigo-400"
            >
              {showAllOrders ? (
                <>
                  <ChevronUp size={18} className="mr-1" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={18} className="mr-1" /> Show All Orders (
                  {profileData.orders.length})
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  const renderWishlistContent = () => {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-center text-gray-200 mb-4">
          {wishItems?.length === 0
            ? "No WishItems Available ☹️ ..."
            : "WishListItems ❤️"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
          {wishItems?.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={item?.product?.img}
                  alt={item.name}
                  className="w-full sm:w-44 h-44 rounded-md object-cover border border-gray-700"
                />
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
                      onClick={() => {
                        handleMoveToCart(item?.product?._id, item?.size);
                      }}
                      className="btn btn-primary btn-sm hover:bg-blue-800"
                    >
                      {cartId === item?.product?._id ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </>
                      ) : (
                        <>AddToCart</>
                      )}
                    </button>
                    <button
                      onClick={() => removeWishItem(item?.product?._id)}
                      className="btn btn-outline btn-sm border-red-500 text-red-400"
                    >
                      {storeProdId === item?.product?._id ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </>
                      ) : (
                        <>
                          <Trash size={16} fill="#f472b6" />
                        </>
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

  const renderPaymentContent = () => {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-200 mb-4">
          Payment Methods
        </h3>

        {profileData.paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-950 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {method.type === "Visa" ? (
                <div className="bg-blue-800 rounded p-2 text-white font-bold text-sm">
                  VISA
                </div>
              ) : (
                <div className="bg-red-800 rounded p-2 text-white font-bold text-sm">
                  MC
                </div>
              )}
              <div>
                <p className="text-white">•••• {method.last4}</p>
                <p className="text-sm text-gray-400">Expires {method.expiry}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-outline btn-xs">Edit</button>
              <button className="btn btn-outline btn-error btn-xs">
                Remove
              </button>
            </div>
          </motion.div>
        ))}

        <button onClick={() => toast.info("Feature in progress...")} className="btn btn-outline w-full mt-4">
          <CreditCard size={16} className="mr-2" /> Add New Payment Method
        </button>
      </motion.div>
    );
  };

  const tabContent = {
    profile: renderProfileContent(),
    orders: renderOrdersContent(),
    wishlist: renderWishlistContent(),
    payment: renderPaymentContent(),
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
                  <span>Products</span>
                </MotionLink>

                <MotionLink
                  to="/#collection"
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
                <Bell
                  size={24}
                  className="text-gray-300 hover:text-white cursor-pointer"
                />
                <span className="absolute -top-2 -right-2 bg-pink-600 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                  2
                </span>
              </motion.div>
              {/* nav Profile Image */}
              <img
                src={
                  verifiedUser.profilePic ||
                  "https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg?ga=GA1.1.609031703.1716957572&semt=ais_hybrid&w=740"
                }
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-600"
              />

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-300 hover:text-white"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
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
                <Package size={16} className="inline mr-2" /> Products
              </Link>

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
                  {
                    id: "payment",
                    name: "Payment Methods",
                    icon: <CreditCard size={18} />,
                  },
                  {
                    id: "settings",
                    name: "Settings",
                    icon: <Settings size={18} />,
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
                  <span className="font-medium">Log Out</span>
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
                {
                  id: "payment",
                  name: "Payment",
                  icon: <CreditCard size={16} />,
                },
                {
                  id: "settings",
                  name: "Settings",
                  icon: <Settings size={16} />,
                },
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
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-gray-500 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Instagram size={20} />
                </motion.a>

                <motion.a
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-gray-500 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-gray-500 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full text-gray-500 hover:bg-indigo-900 transition-colors"
                  href="#"
                >
                  <Linkedin size={20} />
                </motion.a>
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
                  <button className="btn btn-primary btn-sm ml-2">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="divider my-6"></div>

          <div className="text-center text-gray-500 text-sm">
            © 2025 StyleShop. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
