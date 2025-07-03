import React from 'react';
import '../stylesheets/hover.css';

const Card = ({ title, desc, image }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="front">
          <img src={"https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=600"} alt={title} />
        </div>
        <div className="back">
          <h2 className="neon-text">{title}</h2>
          <p className="neon-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
