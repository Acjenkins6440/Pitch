import React from 'react';
import PropTypes from 'prop-types';
import cardBack from '../assets/cardback.jpeg'

const numMap = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
};

const Card = ({ cardKey }) => {
  if(cardKey == 'blank'){
    return (
      <div className="card">
        <div className="card-back">
          <img src={cardBack}/>
        </div>
      </div>
    );
  }
  else{
    const imgSrc = `/public/images/${cardKey}.svg`
    return (
      <div className="card">
        <div className="front">
          <img src={imgSrc} />
        </div>
      </div>
    );
  }
};

Card.propTypes = {
  cardKey: PropTypes.string.isRequired,
};

export default Card;
