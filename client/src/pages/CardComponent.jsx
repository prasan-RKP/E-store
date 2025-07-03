import React, { useRef, useState } from 'react';
//import './CardComponent.css'; // We'll create this CSS file next

const CardComponent = () => {
  const cards = [
    {
      id: 1,
      title: "Creative Design",
      description: "Explore our innovative design solutions that push boundaries.",
      img: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHxzbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D" // Replace with actual image URL
    },
    {
      id: 2,
      title: "Web Development",
      description: "Modern web applications built with cutting-edge technologies.",
      img: "https://images.unsplash.com/photo-1603036050141-c61fde866f5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNuZWFrZXJzfGVufDB8fDB8fHww" // Replace with actual image URL
    },
    {
      id: 3,
      title: "Mobile Solutions",
      description: "Seamless mobile experiences for iOS and Android platforms.",
      img: "https://images.unsplash.com/photo-1636718282214-0b4162a154f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc4fHxzbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D" // Replace with actual image URL
    },
    {
      id: 4,
      title: "UI/UX Excellence",
      description: "User-centered designs that delight and engage your audience.",
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D" // Replace with actual image URL
    }
  ];

  return (
    <div className="card-container-3d">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

const Card = ({ title, description, img }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateY = (mouseX / cardWidth) * 20;
    const rotateX = -(mouseY / cardHeight) * 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div 
      className="card-3d" 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="card-content-3d">
        <h3 className="card-title-3d">{title}</h3>
        <p className={`card-description-3d ${isHovered ? 'visible' : ''}`}>
          {description}
        </p>
        <div className={`card-overlay-3d ${isHovered ? 'active' : ''}`} />
      </div>
    </div>
  );
};

export default CardComponent;
