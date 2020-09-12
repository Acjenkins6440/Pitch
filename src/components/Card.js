import React from 'react';
import PropTypes from 'prop-types';
import cardBack from '../assets/cardback.jpeg';
import { playCard } from '../providers/GameProvider';

const Card = ({ cardKey, playerIndex, cardIndex, canPlayCard, classAttr }) => {
  const classToAdd = classAttr ? classAttr : ''

  const handlePlayCard = () => {
    if(canPlayCard){
      playCard(cardIndex, playerIndex)
    }
  }

  if (cardKey.substr(0, 5) === 'blank') {
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
    <div className={`card ${classToAdd}`}>
      <div className="front">
        <img src={imgSrc} alt="Front of card" id={cardKey} onClick={handlePlayCard} onKeyPress={handlePlayCard}/>
      </div>
    </div>
  );
};

Card.propTypes = {
  cardKey: PropTypes.string.isRequired,
  playerIndex: PropTypes.number,
  cardIndex: PropTypes.number,
  isMyTurn: PropTypes.bool
};

export default Card;
