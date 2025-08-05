import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
// import img1 from "/pexels-lazarus-ziridis-351891426-28580375.jpg";
// import img2 from "/women3.jpg";
// import img3 from "/pexels-lazarus-ziridis-351891426-28580375.jpg";
// import img4 from "/pexels-maurille-loglassi-2150816874-31343785.jpg";
import { Link } from "react-router-dom";
import AlertWindow from "./AlertWindow";
import { toast } from "sonner";

const HomePageShop = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  // custom logicof alert window
  const collectionRef  = useRef(null);
  const productsRef = useRef(null);
  const location = useLocation();

  // dynamic land form other page 
  useEffect(() => {
    if (location.hash === "#products" && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    if (location.hash === "#collection" && collectionRef.current) {
      collectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsLoggedIn((prev) => !prev);
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Fix 1: Use the imported images instead of string paths
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1656696160196-3c3039d2b200?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Use the imported image
      title: "Summer Collection",
      subtitle: "Elevate your style this season",
      ctaText: "Shop Now",
    },
    {
      image:
        "https://images.pexels.com/photos/9775856/pexels-photo-9775856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Use the imported image
      title: "New Arrivals",
      subtitle: "Be the first to discover our latest products",
      ctaText: "Explore",
    },
    {
      image:
        "https://images.pexels.com/photos/7872805/pexels-photo-7872805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Use the imported image
      title: "Limited Edition",
      subtitle: "Exclusive designs for a limited time",
      ctaText: "View Collection",
    },
    {
      image:
        "https://images.pexels.com/photos/5039659/pexels-photo-5039659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Use the imported image
      title: "Explosure Ending X",
      subtitle: "Soon... Possibility",
      ctaText: "Offered Items..",
    },

    {
      image:
        "https://images.pexels.com/photos/8567597/pexels-photo-8567597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Use the imported image
      title: "Explosure Ending X",
      subtitle: "Soon... Possibility",
      ctaText: "Offered Items..",
    },
  ];

  //console.log(heroSlides);

  // Auto slide functionality

  // Categories data
  const categories = [
    { name: "Women", navigate: "/women-clothes", image: "/heros/women2.jpg" },
    { name: "Men", navigate: "/men-clothes", image: "/heros/men1.jpg" },
    {
      name: "Accessories",
      navigate: "/accessories",
      image: "/heros/acc1.jpg",
    },
    {
      name: "Footwear",
      navigate: "/footwears",
      image: "/heros/shoe1.jpg",
    },
  ];

  const featuredProducts = [
    {
      name: "Premium Cotton T-Shirt",
      price: "₹29.99",
      image: "/feature/shirt1.jpg",
      discount: "20%",
    },
    { name: "Designer Jeans", price: "$89.99", image: "/feature/jean1.jpg" },
    {
      name: "Leather Crossbody Bag",
      price: "₹119.99",
      image: "/feature/gucci1.jpg",
      label: "NEW",
    },
    {
      name: "Classic Sneakers",
      price: "₹69.99",
      image: "/feature/shoe.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="relative min-h-screen bg-base-100">
      {/* {!isLoggedIn && (
        <AlertWindow className="absolute top-6 left-1/2 transform -translate-x-1/2" />
      )} */}

      {/* Navigation */}
      {/* ${
          isLoggedIn ? "pointer-events-auto" : "pointer-events-none"
        } */}
      <div className={``}>
        <nav
          className={`${
            // isLoggedIn ? "fixed" : "relative"
            "relative"
          } top-0 w-full bg-base-100 z-50 shadow-sm`}
        >
          <div className="container mx-auto px-4">
            <div className="navbar py-3">
              <div className="navbar-start">
                <button
                  className="btn btn-ghost lg:hidden"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu />
                </button>
                <a className="btn btn-ghost text-xl font-bold my-poke">LUXE</a>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false); // Close menu first

                        setTimeout(() => {
                          document
                            .getElementById("shop-section")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }, 100); // Small delay to ensure the menu is closed
                      }}
                      className="hover:text-primary"
                    >
                      Shop
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false); // Close menu first

                        setTimeout(() => {
                          document
                            .getElementById("feature-section")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }, 100); // Small delay to ensure the menu is closed
                      }}
                      className="hover:text-primary"
                    >
                      Collections
                    </a>
                  </li>
                  <li>
                    <Link to={"/about"} className="hover:text-primary">
                      About
                    </Link>
                  </li>
                  <li>
                    <a className="hover:text-primary">Contact</a>
                  </li>
                  <li>
                    <Link to={"/login"} className="hover:text-primary">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="navbar-end">
                <div className="flex items-center gap-3">
                  <Link to={"/wishlist"}>
                    <button className="btn btn-ghost btn-circle">
                      <Heart className="h-6 w-6 text-red-600" />
                    </button>
                  </Link>
                  <Link to={"/addtocart"}>
                    <button className="btn btn-ghost btn-circle indicator">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <motion.div
          className={`fixed inset-0 z-50 bg-base-100 p-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          initial={{ x: "-100%" }}
          animate={{ x: isMenuOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-8">
            <a className="text-xl font-bold">LUXE</a>
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setIsMenuOpen(false)}
            >
              <X />
            </button>
          </div>
          <ul className="menu w-full gap-2">
            <li>
              <a className="text-lg py-3">Home</a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false); // Close menu first

                  setTimeout(() => {
                    document.getElementById("shop-section")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100); // Small delay to ensure the menu is closed
                }}
                className="hover:text-primary cursor-pointer"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false); // Close menu first

                  setTimeout(() => {
                    document.getElementById("feature-section")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100); // Small delay to ensure the menu is closed
                }}
                className="text-lg py-3"
              >
                Collections
              </a>
            </li>
            <li>
              <Link to={"/about"} className="text-lg py-3">About</Link>
            </li>
            <li>
              <a className="text-lg py-3">Contact</a>
            </li>
          </ul>
        </motion.div>

        {/* Hero section */}
        {/* Hero section */}
        <section className="relative min-h-screen overflow-hidden bg-black">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.2,
                zIndex: currentSlide === index ? 1 : 0,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Background Image with Parallax Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{ y: currentSlide === index ? -20 : 0 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div
                  className="w-full h-full bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{
                    y: currentSlide === index ? 0 : 100,
                    opacity: currentSlide === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-center text-white max-w-4xl mx-auto px-4"
                >
                  <motion.h1
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl md:text-2xl mb-8 text-gray-200"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg
                     hover:bg-opacity-90 transition-all duration-300 
                     shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
                  >
                    {slide.ctaText}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md 
                 hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md 
                 hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </motion.button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative h-2 rounded-full transition-all duration-500 
                   ${
                     currentSlide === index
                       ? "w-12 bg-white"
                       : "w-4 bg-white/40"
                   }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentSlide === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-white/60 via-white to-white/60"
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Categories section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="shop-section" ref={productsRef} className="text-3xl font-bold mb-2">
                Shop by Category
              </h2>
              <p className="text-gray-500">Find what suits your style</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-chick">
              {categories.map((category, index) => (
                <Link to={category.navigate} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-[424px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-2xl font-bold text-white">
                          {category.name}
                        </h3>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "40px" }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="h-1 bg-primary mt-2"
                        />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products section */}
        <section className="py-20 bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden">
  {/* Background decoration */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
  </div>
  
  {/* Custom animations and styles */}
  <style jsx>{`
    @keyframes shimmer {
      0% { transform: translateX(-100%) skewX(-12deg); }
      100% { transform: translateX(200%) skewX(-12deg); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    
    .animate-float {
      animation: float 3s infinite ease-in-out;
    }
    
    .animate-glow {
      animation: glow 2s infinite ease-in-out;
    }
    
    .group:hover .animate-float {
      animation-play-state: running;
    }
  `}</style>

  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        TOP PERFORMERS
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" ref={collectionRef} id="feature-section">
        Our Best Sellers
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Join thousands of satisfied customers who can't get enough of these crowd favorites
      </p>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredProducts.map((product, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -15, transition: { duration: 0.3 } }}
          className="group relative"
        >
          {/* Bestseller rank badge */}
          <div className="absolute -top-3 -left-3 z-20 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
            #{index + 1}
          </div>

          <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-base-300 group-hover:border-primary/30">
            <figure className="relative overflow-hidden group/image">
              {/* Main image with premium hover effects */}
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-all duration-1000 ease-out group-hover:scale-125 group-hover:rotate-2 group-hover:brightness-110 group-hover:contrast-110 group-hover:saturate-110"
                />
                
                {/* Premium overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${2 + i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Labels and badges with enhanced animations */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                {product.discount && (
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-xl border border-red-400/50 animate-pulse transform group-hover:scale-110 transition-transform duration-300">
                    <span className="drop-shadow-sm">{product.discount} OFF</span>
                  </div>
                )}
                {product.label && (
                  <div className="bg-gradient-to-r from-primary to-primary-focus text-white text-xs px-3 py-1 rounded-full font-semibold shadow-xl border border-primary/50 transform group-hover:scale-110 transition-transform duration-300">
                    <span className="drop-shadow-sm">{product.label}</span>
                  </div>
                )}
              </div>

              {/* Enhanced heart icon */}
              <button className="absolute right-3 top-3 z-10 btn btn-circle btn-sm bg-white/95 backdrop-blur-md text-gray-700 border border-white/50 hover:bg-primary hover:text-white hover:scale-125 hover:rotate-12 transition-all duration-500 shadow-xl hover:shadow-2xl group-hover:animate-bounce">
                <Heart size={16} className="drop-shadow-sm" />
              </button>

              {/* Premium trending indicator */}
              <div className="absolute bottom-3 right-3 z-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-xl border border-emerald-400/50 transform group-hover:scale-110 transition-all duration-300">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm"></span>
                <span className="drop-shadow-sm">TRENDING</span>
              </div>

              {/* Premium glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-secondary/10 blur-sm"></div>
              </div>
            </figure>

            <div className="card-body p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="card-title text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <p className="text-primary font-bold text-xl">{product.price}</p>
                
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.9)</span>
                </div>
              </div>

              {/* Enhanced social proof with dynamic numbers */}
              
              {/* Call to action - view details instead of add to cart */}
              <div className="card-actions">
                <button className="btn btn-outline btn-primary btn-sm btn-block group-hover:btn-primary group-hover:text-white transition-all duration-300 hover:scale-105">
                  <span className="flex items-center gap-2">
                    View Details
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom CTA section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="text-center mt-16"
    >
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
        <h3 className="text-2xl font-bold mb-3">Why These Are Our Best Sellers</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Handpicked by our customers, these products have earned their place at the top through 
          exceptional quality, unmatched value, and thousands of 5-star reviews.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-amber-600">Premium Quality</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-blue-900">Customer Favorite</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span className="text-pink-400">Fast Shipping</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

        {/* Newsletter section */}
        <section className="py-16 bg-primary text-primary-content">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="mb-8">
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="input input-bordered bg-primary-content text-base-content flex-grow text-blue-950"
                />
                <button
                  className="btn bg-base-100 hover:bg-base-200 text-primary"
                  onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
                >
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fix 2: Improve footer layout with flex and responsive design */}
        <footer className="bg-base-200 text-base-content">
          <div className="container mx-auto">
            {/* Footer main section - changed to flex layout */}
            <div className="flex flex-wrap justify-between p-10">
              <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
                <span className="footer-title">Company</span>
                <a className="link link-hover block mt-2">About us</a>
                <a className="link link-hover block mt-2">Contact</a>
                <a className="link link-hover block mt-2">Careers</a>
                <a className="link link-hover block mt-2">Press kit</a>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
                <span className="footer-title">Legal</span>
                <a className="link link-hover block mt-2">Terms of use</a>
                <a className="link link-hover block mt-2">Privacy policy</a>
                <a className="link link-hover block mt-2">Cookie policy</a>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
                <span className="footer-title">Shop</span>
                <a className="link link-hover block mt-2">New arrivals</a>
                <a className="link link-hover block mt-2">Best sellers</a>
                <a className="link link-hover block mt-2">Sale</a>
                <a className="link link-hover block mt-2">Gift cards</a>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0">
                <span className="footer-title">Stay Connected</span>
                <div className="form-control w-full">
                  <div className="flex space-x-2 mt-2">
                    <button className="btn btn-circle btn-outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </button>
                    <button className="btn btn-circle btn-outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </button>
                    <button className="btn btn-circle btn-outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer bottom - changed to improved flex layout */}
            <div className="px-10 py-4 border-t border-base-300 flex flex-col md:flex-row justify-between items-center">
              <div>
                <p>© 2025 LUXE - All rights reserved</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex gap-4">
                  <a className="link link-hover">Shipping</a>
                  <a className="link link-hover">Returns</a>
                  <a className="link link-hover">FAQ</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePageShop;
