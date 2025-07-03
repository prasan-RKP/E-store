"use client"
import { motion } from "framer-motion"
import { ShoppingBag, Heart, Star, ArrowRight } from "lucide-react"

// Reusable product card component
const ProductCard = ({ product }) => {
  return (
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
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{product.name}</h3>
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
  )
}

export default ProductCard
