"use client"
import { motion } from "framer-motion"

// Reusable category card component
const CategoryCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      }}
      className={`rounded-2xl p-6 text-center cursor-pointer bg-gradient-to-br ${category.color} relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <motion.div
          className="text-4xl mb-3"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: index * 0.2,
          }}
        >
          {category.icon}
        </motion.div>
        <h3 className="font-bold text-white">{category.name}</h3>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-white"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  )
}

export default CategoryCard
