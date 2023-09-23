import React from 'react';
import './Card.css'; // Import your CSS file for styling

const Card = ({ title, technologies=[{}], frontend, backend, databases, infrastructure }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">
        <p className="card-text"><strong>Technologies:</strong> {technologies.map((technology)=>technology.title)}</p>
        <p className="card-text"><strong>Frontend:</strong> {frontend.map((technology)=>technology.title)}</p>
        <p className="card-text"><strong>Backend:</strong> {backend.map((technology)=>technology.title)}</p>
        <p className="card-text"><strong>Databases:</strong> {databases.map((technology)=>technology.title)}</p>
        <p className="card-text"><strong>Infrastructure:</strong> {infrastructure.map((technology)=>technology.title)}</p>
      </div>
    </div>
  );
};

export default Card;
