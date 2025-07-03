import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import { Droplets, Flame, ThermometerSnowflake } from 'lucide-react';

export default function FantaCanShowcase() {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isHovered) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Calculate the center of the element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the rotation based on mouse position relative to center
    // Limit rotation to a reasonable range (-15 to 15 degrees)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset rotation smoothly
    setRotation({ x: 0, y: 0 });
  };

  // Fanta flavor data for swiper
  const flavors = [
    { 
      name: "Orange", 
      color: "bg-gradient-to-b from-orange-500 to-blue-500", 
      icon: <Flame className="text-orange-300" size={24} />,
      desc: "Classic citrus refreshment"
    },
    { 
      name: "Berry", 
      color: "bg-gradient-to-b from-purple-500 to-blue-500", 
      icon: <Droplets className="text-purple-300" size={24} />,
      desc: "Sweet berry blast"
    },
    { 
      name: "Lemon", 
      color: "bg-gradient-to-b from-yellow-400 to-blue-500", 
      icon: <ThermometerSnowflake className="text-yellow-300" size={24} />,
      desc: "Zesty lemon chill"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Fanta Experience</h1>
        <p className="text-gray-300">Hover over the can for a refreshing 3D experience</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl">
        {/* 3D Rotating Can */}
        <div 
          ref={containerRef}
          className="relative w-full md:w-1/2 flex justify-center items-center h-96 perspective"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="relative w-64 h-64 cursor-pointer"
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -10 : 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: 1000
            }}
          >
            {/* Main Image */}
            <div className="h-full w-full relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/fanta.jpg" 
                alt="Fanta can with splash"
                className="h-full w-full object-contain"
              />
              
              {/* Overlay water effect */}
              {isHovered && (
                <motion.div 
                  className="absolute inset-0 bg-blue-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-full h-full opacity-30" />
                </motion.div>
              )}
            </div>
            
            {/* Reflection */}
            <div className="absolute -bottom-8 left-0 w-full flex justify-center">
              <motion.div 
                className="w-40 h-8 bg-gradient-to-t from-transparent to-blue-200/20 rounded-full blur-md"
                animate={{
                  opacity: isHovered ? 0.7 : 0.3,
                  scaleX: isHovered ? 1.2 : 1,
                }}
              />
            </div>
          </motion.div>
          
          {/* Animated water droplets */}
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-200/80 w-2 h-2 z-10"
                  initial={{ 
                    x: (i - 2) * 40, 
                    y: -20, 
                    opacity: 1
                  }}
                  animate={{ 
                    y: 150,
                    opacity: 0,
                  }}
                  transition={{ 
                    duration: 1 + (i * 0.2), 
                    repeat: Infinity,
                    repeatDelay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        {/* Content & Flavors */}
        <div className="w-full md:w-1/2 text-white">
          <div className="card bg-base-100 bg-opacity-10 backdrop-blur-sm border border-gray-700 shadow-xl p-6">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-4 font-bold text-orange-400">Fanta Refreshment</h2>
              <p className="mb-6">Experience the vibrant flavor and refreshing sensation of Fanta. Our iconic orange soda with a splash of fun, perfect for any moment that needs a burst of excitement.</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Explore Flavors</h3>
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards, Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="w-full max-w-xs h-40"
                >
                  {flavors.map((flavor, index) => (
                    <SwiperSlide key={index} className={`rounded-lg ${flavor.color} p-4 flex flex-col justify-center`}>
                      <div className="flex items-center gap-2">
                        {flavor.icon}
                        <h4 className="font-bold">{flavor.name}</h4>
                      </div>
                      <p className="text-sm mt-2">{flavor.desc}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              
              <div className="card-actions justify-end">
                <button className="btn btn-primary bg-orange-500 hover:bg-orange-600 border-none">
                  Get Refreshed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}