import React from 'react';
import PropTypes from 'prop-types';
import cardBack from '../assets/cardback.jpeg';

const Card = ({ cardKey }) => {
  if (cardKey === 'blank') {
    return (
      <div className="card">
        <div className="card-back">
          <img src={cardBack} alt="Back of card" />
        </div>
      </div>
    );
  }

  const imgSrc = `/public/images/${cardKey}.svg`;
  return (
    <div className="card">
      <div className="front">
        <img src={imgSrc} alt="Front of card" />
      </div>
    </div>
  );
};

Card.propTypes = {
  cardKey: PropTypes.string.isRequired,
};

export default Card;
