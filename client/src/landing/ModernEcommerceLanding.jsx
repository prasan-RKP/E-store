"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei"
import { ShoppingBag, Star, Truck, Shield, Heart, Search, Menu, X, ChevronRight, ArrowRight, MessageCircle } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

// 3D Model Component
// function ProductModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 2.5 }) {
//   // In a real implementation, you would use your own 3D model
//   // This is just a placeholder using the sample duck model
//   const { scene } = useGLTF("/assets/duck.glb")

//   return (
//     <Float rotationIntensity={0.4} floatIntensity={1.5} speed={1.5}>
//       <primitive object={scene} position={position} rotation={rotation} scale={scale} />
//     </Float>
//   )
// }

// Floating Sphere Component for background decoration
function FloatingSphere({ position, size, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
    </mesh>
  )
}


// Tootip code 
const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -12 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-800 text-white px-3 py-2 rounded-full text-sm whitespace-nowrap border border-green-600 backdrop-blur-sm bg-opacity-90 flex items-center gap-2 shadow-xl">
              <MessageCircle className="h-3 w-3" />
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Component
const ModernEcommerceLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  // Featured Products Data
  const featuredProducts = [
    {
      id: 1,
      name: "Quantum Headphones",
      price: 299,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
      rating: 4.9,
      reviews: 120,
      tag: "New",
    },
    {
      id: 2,
      name: "Nebula Smart Watch",
      price: 199,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=989",
      rating: 4.7,
      reviews: 86,
      tag: "Best Seller",
    },
    {
      id: 3,
      name: "Echo Wireless Earbuds",
      price: 149,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1000",
      rating: 4.8,
      reviews: 94,
      tag: "Sale",
    },
    {
      id: 4,
      name: "Pulse Portable Speaker",
      price: 129,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000",
      rating: 4.6,
      reviews: 72,
      tag: "Limited",
    },
    {
      id: 5,
      name: "Aura Fitness Tracker",
      price: 89,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000",
      rating: 4.5,
      reviews: 65,
      tag: "Popular",
    },
  ]

  // Categories Data
  const categories = [
    { name: "Electronics", icon: "💻", color: "from-blue-500 to-indigo-600", message: "Taste Food",
    messageColor: "from-yellow-600 to-orange-700", },
    { name: "Fashion", icon: "👕", color: "from-pink-500 to-rose-600", message: "Taste Food",
    messageColor: "from-yellow-600 to-orange-700", },
    { name: "Home", icon: "🏠", color: "from-green-500 to-emerald-600", message: "Taste Food",
    messageColor: "from-yellow-600 to-orange-700", },
    { name: "Beauty", icon: "✨", color: "from-purple-500 to-violet-600",  message: "Taste Food",
    messageColor: "from-yellow-600 to-orange-700",  },
    { name: "Sports", icon: "🏀", color: "from-orange-500 to-amber-600",  message: "Taste Food",
    messageColor: "from-yellow-600 to-orange-700",  },
    // { name: "Books", icon: "📚", color: "from-yellow-500 to-amber-400" },
  ]

  // Testimonials Data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "The products are amazing and the delivery was super fast. Will definitely shop here again!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      content: "Great selection of tech products. The quality exceeds expectations every time.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Emma Williams",
      role: "Fashion Blogger",
      content: "I love the fashion collection. Always on trend and great quality for the price.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            >
              NOVA
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex space-x-8"
            >
              <a href="#" className="hover:text-purple-400 transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Shop
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Categories
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <ShoppingBag className="h-5 w-5" />
              </button>
              <button
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-white/10 md:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#" className="py-2 hover:text-purple-400 transition-colors">
                Home
              </a>
              <a href="#" className="py-2 hover:text-purple-400 transition-colors">
                Shop
              </a>
              <a href="#" className="py-2 hover:text-purple-400 transition-colors">
                Categories
              </a>
              <a href="#" className="py-2 hover:text-purple-400 transition-colors">
                About
              </a>
              <a href="#" className="py-2 hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with 3D Object */}
      <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-pink-600/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm font-medium inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4"
            >
              Next Generation Shopping
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Future of{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Digital
              </span>{" "}
              Shopping
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-lg">
              Experience the revolution in online shopping with our curated collection of premium products and immersive
              shopping experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center gap-2 transition-all"
              >
                Shop Now <ShoppingBag className="ml-1 h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium flex items-center gap-2 transition-all hover:bg-white/10"
              >
                Explore <ChevronRight className="ml-1 h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* <div className="h-[400px] md:h-[500px] w-full">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
              <color attach="background" args={["transparent"]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

              
              <FloatingSphere position={[-4, 2, -5]} size={1} color="#8b5cf6" />
              <FloatingSphere position={[5, -2, -5]} size={0.7} color="#ec4899" />
              <FloatingSphere position={[3, 3, -4]} size={0.5} color="#3b82f6" />

              <PresentationControls
                global
                rotation={[0, -Math.PI / 4, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <ProductModel position={[0, -1, 0]} rotation={[0, 0.5, 0]} />
                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={5} />
              </PresentationControls>
              <Environment preset="city" />
            </Canvas>
          </div> */}
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="text-white/70"
          >
            Scroll Down
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={targetRef} className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        </div>

        <motion.div style={{ opacity, scale, y }} className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4"
            >
              Curated Selection
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Discover our handpicked selection of premium products that combine style, quality, and innovation.
            </motion.p>
          </div>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="pb-16"
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id} style={{ width: "300px", height: "450px" }}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="h-full rounded-2xl overflow-hidden group relative bg-gradient-to-b from-gray-900 to-black border border-white/10"
                >
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600">
                      {product.tag}
                    </div>
                  )}

                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="btn btn-circle bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                        >
                          <ShoppingBag className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="btn btn-circle bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                        >
                          <Heart className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-current"
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-sm ml-2 text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        ${product.price}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-20 relative">
  <div className="absolute inset-0 z-0">
    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-600/20 rounded-full filter blur-3xl"></div>
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-sm font-medium inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4"
      >
        Browse By Category
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
      >
        Shop by Category
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-xl text-gray-400 max-w-2xl mx-auto"
      >
        Browse our wide range of categories to find exactly what you're looking for.
      </motion.p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((category, index) => (
        <Tooltip key={category.name} text={category.message}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-6 text-center cursor-pointer bg-gradient-to-br ${category.color} relative overflow-hidden group`}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            {/* Glowing border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.messageColor} opacity-20 blur-sm`} />
              <div className={`absolute inset-[1px] rounded-2xl bg-gradient-to-r ${category.messageColor} opacity-30`} />
            </div>

            {/* Particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 2) * 40}%` }}
                  animate={{ y: [0, -20, 0], opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            {/* Icon and Title */}
            <div className="relative z-10">
              <motion.div
                className="text-4xl mb-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: index * 0.2 }}
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              >
                {category.icon}
              </motion.div>
              <h3 className="font-bold text-white group-hover:text-white/90 transition-colors">
                {category.name}
              </h3>
            </div>

            {/* Bottom progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "left" }}
            />

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              initial={{ scale: 0, opacity: 0.5 }}
              whileHover={{
                scale: 1.5,
                opacity: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        </Tooltip>
      ))}
    </div>
  </div>
</section>


      {/* Features */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 group"
            >
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">Fast Delivery</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Free shipping on all orders over $50. Fast delivery to your doorstep within 2-3 business days.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 group"
            >
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-pink-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                <div className="relative bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors">Secure Payment</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Your payments are secure with our private and encrypted system. We support all major credit cards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 group"
            >
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Quality Guarantee</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                We stand behind the quality of our products with a 100% satisfaction guarantee or your money back.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-medium inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4"
            >
              Customer Reviews
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Don't just take our word for it. Here's what our customers have to say about their shopping experience.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 relative group"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ transformOrigin: "left" }}
                ></div>
                <div className="flex items-center mb-6">
                  <div className="mr-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur-md group-hover:opacity-70 transition-opacity"></div>
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover relative z-10 border-2 border-white/20"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-300 mb-6">"{testimonial.content}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600/30 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Subscribe to our newsletter for exclusive deals, new arrivals, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ModernEcommerceLanding
