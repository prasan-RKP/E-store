import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    id: 1,
    title: "Creative Design",
    description: "Explore our innovative design solutions that push boundaries.",
    image: "https://source.unsplash.com/300x400/?design"
  },
  {
    id: 2,
    title: "Web Development",
    description: "Modern web applications built with cutting-edge technologies.",
    image: "https://source.unsplash.com/300x400/?code"
  },
  {
    id: 3,
    title: "Mobile Solutions",
    description: "Seamless mobile experiences for iOS and Android platforms.",
    image: "https://source.unsplash.com/300x400/?mobile"
  },
  {
    id: 4,
    title: "UI/UX Excellence",
    description: "User-centered designs that delight and engage your audience.",
    image: "https://source.unsplash.com/300x400/?ux"
  }
];

const TypingAnimation = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-10">
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

const Card = ({ title, description, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-(y / 20)}deg) rotateY(${x / 20}deg)`;
  };

  const resetTransform = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <motion.div
      className="w-72 h-96 rounded-2xl overflow-hidden relative shadow-lg transform transition-transform duration-500"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        resetTransform();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      ref={cardRef}
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10 transition-all duration-500 ${isHovered ? 'opacity-90' : 'opacity-70'}`} />
      <div className="absolute bottom-0 p-6 text-white z-20">
        <motion.h3 className="text-xl font-bold mb-2">{title}</motion.h3>
        <motion.p
          className="text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default TypingAnimation;
