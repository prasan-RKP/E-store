import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import { toast } from "sonner";
import ProductDisplaySkeleton from "../skeletons/ProductDisplaySkeleton.jsx";

const ProductDisplay = () => {
  const [isAddingProdId, setIsAddingProdId] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoved, setIsLoved] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
    productId: "",
  });
  const [isSticky, setIsSticky] = useState(false);
  const carouselRef = useRef(null);
  const headerRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishItems, setWishItems] = useState({});

  const { id } = useParams();


  const {
    productShow,
    authProdDetail,
    verifiedUser,
    addCart,
    isAddingReview,
    addReview,
    review,
    fetchReviews,
    fetchWishListProd
  } = userAuthStore();

  let rating = authProdDetail?.product?.rating;


  // Setting the productId to
  useEffect(() => {
    if (id) {
      setReviewForm((prev) => ({
        ...prev,
        productId: id,
      }));
    }
  }, [id]);

  // Getting Initial comments

  useEffect(() => {
    if (id) {
      fetchReviews({ pid: id });
    }
  }, [id]);

  useEffect(() => {
    if (review && id) {
      setMyReviews(review?.filter((item) => item?.productId === id));
    }
  }, [review, id]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await productShow({ pid: id });
      setIsLoading(false);
      setCartItems(verifiedUser?.cart || []);
    })();
  }, [id, verifiedUser?.cart]);

  // Related products array
  const relatedProducts = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644643/ecom_store/footwear/rmea5ta6t5zrupc4ejkq.jpg",
      alt: "Related product 1",
      name: "Premium Jeans",
      price: "89.99",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644562/ecom_store/footwear/e6otgthvbzlfl6cgmgxc.jpg",
      alt: "Related product 2",
      name: "Denim Jacket",
      price: "129.99",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644540/ecom_store/footwear/ik5ba8edhywvwiovkesh.jpg",
      alt: "Related product 3",
      name: "Leather Belt",
      price: "49.99",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644552/ecom_store/footwear/f2azgaf3ibsjogrk44hr.jpg",
      alt: "Related product 4",
      name: "Casual Shoes",
      price: "79.99",
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644637/ecom_store/footwear/wjaa7bcz2xjeqluocgzx.jpg",
      alt: "Related product 5",
      name: "Cotton T-Shirt",
      price: "39.99",
    },
  ];

  //Handle AddTocartItem  functionality

  // const 'navitems' for md&Above
  const navItems = [
    { text: "Home", join: "/" },
    { text: "Contact", join: "/#contact" },
    { text: "Shop", join: "/#products" }
  ]

  const handleAddToCart = async (id, size) => {
    setIsAddingProdId(id);
    await addCart({ productId: id, size: size });
    setIsAddingProdId(null);
    console.log(`prodId from ProdDisplay:${id} & prodSize:${size}`);
  };

  // Upload review functionality

  const handleUploadReview = (userName, rating, description) => { };

  useState(() => {
    // console.log("My Review is", review);
  }, [review]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsSticky(window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const toggleLove = () => {
    setIsLoved(!isLoved);
  };

  // Navigation for related items carousel
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Navigation for thumbnail images
  const navigateThumbnails = (direction) => {
    if (direction === "left") {
      setSelectedImageIndex((prev) =>
        prev > 0 ? prev - 1 : productImages.length - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev < productImages.length - 1 ? prev + 1 : 0
      );
    }
  };

  // Handle form input changes
  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (reviewForm.name.trim().length < 5) {
      toast.error("userName should be at least 5 characters long");
      return false;
    }

    if (reviewForm.rating === 0) {
      toast.error("Rating cannot be Zero");
      return false;
    }

    if (reviewForm.comment.trim().length < 8) {
      toast.error("Comment should be at least 8 Characters long");
      return false;
    }

    if (!reviewForm.productId) {
      //console.log("Product iD", reviewForm.productId);
      toast.error("Product Not Found");
      return false;
    }

    await addReview(reviewForm);
    setReviewForm({ name: "", rating: 5, comment: "" });
  };

  // Nav item hover animation variants
  const navItemVariants = {
    initial: { width: 0, opacity: 0 },
    hover: { width: "100%", opacity: 1, transition: { duration: 0.3 } },
  };


  console.log("AuthProdDetails", authProdDetail);

  // AddToWishList ❤️
  const handleAddToWishList = async (productId) => {
    setWishItems(prev => ({ ...prev, [productId]: true }));
    await fetchWishListProd({ pid: productId });
    setWishItems(prev => ({ ...prev, [productId]: false }));
  }

  // condition for skeleton view
  if (isLoading || !authProdDetail?.product) {
    return <ProductDisplaySkeleton />;
  }

  const navItem = [
    { text: "Home", link: "/" },
    { text: "WishList ❤️", link: "/wishlist" },
    { text: "Carts", link: "/addtocart" },
    { text: "Contact", link: "/contact" }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-gray-100">
      {/* Header */}
      <header
        ref={headerRef}
        className={`bg-slate-900 text-white py-4 px-4 md:px-0 transition-all duration-300 ${isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""
          }`}
      >
        <div className="container mx-auto flex flex-col items-center space-y-4">
          {/* Top Centered Brand and Cart */}
          <div className="flex justify-center items-center space-x-7">
            {/* Brand */}
            <h1 className="text-white text-2xl font-bold">
              Lu<span className="text-red-500">Xe</span>
            </h1>

            {/* Cart */}
            <button className="p-2 hover:bg-slate-800 rounded-full transition relative">
              <Link to="/addtocart">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems?.length}
                </span>
              </Link>
            </button>

            {/* "wishList ❤️ added" */}
            <button className="p-2 hover:bg-slate-800 rounded-full transition relative">
              <Link to="/wishlist">
                <Heart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {verifiedUser?.wishlist?.length}
                </span>
              </Link>
            </button>
          </div>

          {/* Navigation Links (for md and above) */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item} className="relative group">
                  <Link
                    to={`${item.join}`}
                    className="hover:text-[#FF6EC7] transition duration-300 py-2"
                  >
                    {item.text}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-blue-400 rounded-full"
                      initial="initial"
                      whileHover="hover"
                      variants={navItemVariants}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav
        className={`md:hidden bg-slate-800 text-white py-2 ${isSticky ? "mt-16" : ""
          }`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex justify-between">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className="text-lg text-blue-400 hover:text-blue-400 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Product Navigation */}
      <nav
        className={`bg-slate-900 shadow-sm py-3 overflow-x-auto whitespace-nowrap px-4 md:px-0 border-t border-slate-800 ${isSticky ? "md:mt-16" : ""
          }`}
      >
        <div className="container mx-auto flex justify-center md:justify-center space-x-6">
          {[
            { name: "Mens", path: "/men-clothes" },
            { name: "Footwear", path: "/footwears" },
            { name: "Accessories", path: "/accessories" },
            { name: "Women", path: "/women-clothes" },
          ].map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-gray-400  hover:text-blue-400 transition text-sm md:text-base relative group"
            >
              {category.name}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-blue-400 rounded-full"
                initial="initial"
                whileHover="hover"
                variants={navItemVariants}
              />
            </Link>
          ))}
        </div>
      </nav>

      {/* Product Display */}
      <div
        className={`container mx-auto flex flex-col md:flex-row py-6 px-4 md:px-6 gap-8 ${isSticky ? "mt-4" : ""
          }`}
      >
        {/* Left Section: Product Images */}
        <div className="md:w-1/2 flex flex-col space-y-4">
          {/* Main Image with zoom effect */}
          <motion.div
            className="relative overflow-hidden rounded-lg bg-slate-800 aspect-square md:aspect-auto md:h-96 lg:h-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{
                scale: zoom ? 1.1 : 1,
                transition: { duration: 0.3 },
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.img
                src={authProdDetail?.product?.img}
                alt={authProdDetail?.product?.category}
                className="object-contain w-full h-full"
                key={authProdDetail?.product?.uid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* <motion.button
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition"
                onClick={toggleLove}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  size={20}
                  className={
                    isLoved ? "text-red-500 fill-red-500" : "text-gray-400"
                  }
                />
              </motion.button> */}
            </motion.div>

            {/* Image navigation arrows - visible on all devices */}
            {/* <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-2">
              <motion.button
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition shadow-sm"
                onClick={() => navigateThumbnails("left")}
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} className="text-gray-500" />
              </motion.button>
              <motion.button
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition shadow-sm"
                onClick={() => navigateThumbnails("right")}
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} className="text-gray-500" />
              </motion.button>
            </div> */}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <motion.button
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center  cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleAddToCart(
                  authProdDetail?.product?._id || id,
                  authProdDetail?.cartDetail?.size || selectedSize.toString()
                )
              }
            >
              <ShoppingCart size={18} className="mr-2" />
              {isAddingProdId === authProdDetail?.product?._id ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </span>
              ) : (
                "Add to Cart"
              )}
            </motion.button>
            <motion.button
              className="flex-1 py-3 px-6 border border-blue-600 text-blue-400 hover:bg-slate-800 font-medium rounded-lg transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToWishList(authProdDetail?.product?._id)}
            >
              {wishItems[authProdDetail?.product?._id] ? (
                <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />
              ) : (
                <span>Add to WishList ❤️</span>
              )}

            </motion.button>
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="md:w-1/2 flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white relative inline-block group cursor-pointer">
              {authProdDetail?.product?.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => {
                  if (star <= Math.floor(rating)) {
                    return (
                      <Star
                        key={star}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    );
                  } else if (star - rating < 1 && star - rating > 0) {
                    return (
                      <Star
                        key={star}
                        size={16}
                        className="text-yellow-400 fill-yellow-200"
                      />
                    ); // optional styling for half
                  } else {
                    return (
                      <Star key={star} size={16} className="text-gray-400" />
                    );
                  }
                })}
              </div>
              <span className="ml-2 text-sm text-gray-400">
                {authProdDetail?.product?.rating} (
                {authProdDetail?.product?.reviewCount} reviews)
              </span>
            </div>
          </motion.div>

          <motion.div
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          // onClick={()=> console.log(authProdDetail?.product?._id)}
          >
            ₹{authProdDetail?.product?.price}
          </motion.div>

          <motion.div
            className="text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => console.log(verifiedUser)}
          >
            {authProdDetail?.product?.desc}
          </motion.div>

          {/* Size Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              SELECT SIZE
            </h3>
            <div className="flex flex-wrap gap-2">
              {authProdDetail?.product?.sizes &&
                authProdDetail.product.sizes.length > 0 ? (
                authProdDetail.product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    className={`w-12 h-12 flex items-center justify-center rounded-md transition ${selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-slate-800 text-gray-300 border border-slate-700 hover:border-blue-500"
                      }`}
                    onClick={() => handleSizeChange(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))
              ) : (
                <motion.button
                  className={`w-32 h-12 flex items-center justify-center rounded-md bg-slate-800 text-gray-300 border border-slate-700`}
                  disabled
                >
                  Regular Size
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Product details accordion */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-4 cursor-pointer bg-slate-800">
                  <h3 className="font-semibold text-white">Product Details</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="p-4 bg-slate-900">
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>This Segment is Coming soon. 🔜</li>
                    {/* <li>Machine washable at 30°C</li>
                    <li>Five pocket styling</li>
                    <li>Button and zip fly fastening</li>
                    <li>Belt loops</li>
                    <li>Regular fit</li> */}
                  </ul>
                </div>
              </details>
            </div>

            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-4 cursor-pointer bg-slate-800">
                  <h3 className="font-semibold text-white">
                    Shipping Information
                  </h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="p-4 bg-slate-900 text-sm text-gray-300">
                  <p>This Segment is Coming soon. 🔜</p>
                  {/* <p>Standard delivery: 3-5 business days</p>
                  <p>
                    Express delivery: 1-2 business days (additional charges
                    apply)
                  </p> */}
                </div>
              </details>
            </div>

            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-4 cursor-pointer bg-slate-800">
                  <h3 className="font-semibold text-white">Customer Reviews</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="p-4 bg-slate-900">
                  {/* Review List */}
                  <div
                    className={`space-y-4 pr-2 ${myReviews.length > 3 ? "max-h-64 overflow-y-auto" : ""
                      }`}
                  >
                    {myReviews?.length > 0 ? (
                      myReviews?.map((review, index) => (
                        <div key={index} className="text-sm text-gray-300">
                          <div className="flex items-center">
                            <span className="font-medium">
                              {review.username}
                            </span>
                            <div className="flex ml-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={12}
                                  className={
                                    star <= review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-600"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-1">"{review.reviewBox}"</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">
                        No reviews yet. Be the first to leave one!
                      </p>
                    )}
                  </div>

                  {/* Review Form (unchanged) */}
                  <form
                    onSubmit={handleReviewSubmit}
                    className="mt-6 border-t border-slate-700 pt-4"
                  >
                    <h4 className="text-sm font-medium text-white mb-3">
                      Share Your Experience
                    </h4>

                    {/* Name Input */}
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="block text-xs text-gray-400 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={reviewForm.name}
                        onChange={handleReviewInputChange}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* Rating */}
                    <div className="mb-3">
                      <label className="block text-xs text-gray-400 mb-1">
                        Rating
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() =>
                              setReviewForm((prev) => ({ ...prev, rating }))
                            }
                            className="focus:outline-none mr-1"
                          >
                            <Star
                              size={16}
                              className={
                                rating <= reviewForm.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-600"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comment Box */}
                    <div className="mb-3">
                      <label
                        htmlFor="comment"
                        className="block text-xs text-gray-400 mb-1"
                      >
                        Your Review
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        value={reviewForm.comment}
                        onChange={handleReviewInputChange}
                        rows={3}
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:border-blue-500"
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="hover:cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isAddingReview ? (
                        <>
                          submitting..{" "}
                          <Loader2 className="h-5 w-5 animate-spin ml-1.5" />
                        </>
                      ) : (
                        <>
                          <Send size={14} className="mr-2" />
                          Submit Review
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </details>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Items */}
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-xl md:text-2xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            You May Also Like
          </motion.h2>
          <div className="flex space-x-2">
            <motion.button
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition"
              onClick={() => scrollCarousel("left")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} className="text-white" />
            </motion.button>
            <motion.button
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition"
              onClick={() => scrollCarousel("right")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} className="text-white" />
            </motion.button>
          </div>
        </div>

        <div
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth space-x-4 pb-4"
          ref={carouselRef}
        >
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product?.id}
              className="snap-start flex-shrink-0 w-64 bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => toast.info('Feature Coming Soon 🔜 ...')}
            >
              <div className="aspect-square bg-slate-700">
                <img
                  src={product?.src}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white group cursor-pointer inline-block">
                  {product?.name}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-400"></span>
                </h3>
                <p className="text-blue-400 mt-1">₹{product?.price}</p>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={
                        star <= 4
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div>
              <div className="text-xl font-bold mb-2"><h1 className="text-white text-2xl font-bold">
                Lu<span className=" text-red-500">Xe</span>
              </h1></div>
              <p className="text-gray-400 text-sm">
                Premium clothing for everyday comfort
              </p>
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {navItem.map((item) => (
                  <li key={item} className="relative group">
                    <Link
                      to={`${item.link}`}
                      className="text-sm hover:text-blue-400 transition"
                    >
                      {item.text}
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-400 rounded-full"
                        initial="initial"
                        whileHover="hover"
                        variants={navItemVariants}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-gray-400">
            © 2025 luxe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDisplay;