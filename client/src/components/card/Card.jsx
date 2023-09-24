import React, { useState } from 'react';
import './Card.css'; // Import your CSS file for styling
import Modal from 'components/modal/Modal';

const Card = ({ title, technologies = [{}], frontend, backend, databases, infrastructure }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <>
      {isModalOpen && <Modal toggleModal={toggleModal} title={title} technologies={technologies} frontend={frontend} backend={backend} databases={databases} infrastructure={infrastructure} />}
      <div className="card" onClick={toggleModal}>
        <h2 className="card-title">{title}</h2>
        <div className="card-content">
          <p className="card-text"><strong>Technologies:</strong> {technologies?.map((technology) =>  <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
          <p className="card-text"><strong>Frontend:</strong> {frontend?.map((technology) => <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
          <p className="card-text"><strong>Backend:</strong> {backend?.map((technology) => <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
          <p className="card-text"><strong>Databases:</strong> {databases?.map((technology) =>  <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
          <p className="card-text"><strong>Infrastructure:</strong> {infrastructure?.map((technology) =>  <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
