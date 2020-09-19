import React from 'react';
import PropTypes from 'prop-types';
import cardBack from '../assets/cardback.jpeg';
import { playCard } from '../providers/GameProvider';

const Card = ({
  cardKey, playerIndex, cardIndex, canPlayCard, classAttr, alreadyPlayedCard, playedCard,
}) => {
  const classToAdd = classAttr || '';

  const handlePlayCard = () => {
    if (canPlayCard && !alreadyPlayedCard) {
      playedCard();
      playCard(cardIndex, playerIndex);
    }
  };

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
  const img = classAttr
    ? <img src={imgSrc} alt="Front of card" id={cardKey} />
    : <input type="image" src={imgSrc} alt="Front of card" id={cardKey} onClick={handlePlayCard} onKeyPress={handlePlayCard} />;
  return (
    <div className={`card ${classToAdd}`}>
      <div className="front">
        {img}
      </div>
    </div>
  );
};

Card.propTypes = {
  cardKey: PropTypes.string.isRequired,
  playerIndex: PropTypes.number,
  cardIndex: PropTypes.number,
  canPlayCard: PropTypes.bool,
  classAttr: PropTypes.string,
  alreadyPlayedCard: PropTypes.bool,
  playedCard: PropTypes.func,
};

Card.defaultProps = {
  playerIndex: 0,
  cardIndex: 0,
  canPlayCard: false,
  classAttr: '',
  alreadyPlayedCard: false,
  playedCard: null,
};

export default Card;
