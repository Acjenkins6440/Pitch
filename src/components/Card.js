import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import cardBack from '../assets/cardback.jpeg';
import { playCard } from '../providers/GameProvider';

const Card = ({
  cardKey, playerIndex, cardIndex, canPlayCard, classAttr, alreadyPlayedCard, playedCard,
}) => {
  const [imgSrc, setImgSrc] = useState('');
  const [highlight, setHighlight] = useState(false);
  useEffect(() => {
    const imgKey = cardKey[0] === 'A'
      ? `Ac${cardKey[1]}.svg`
      : `${cardKey}.svg`;
    Storage.get(`images/${imgKey}`).then((resp) => { setImgSrc(resp); });
  }, [cardKey]);
  const classToAdd = classAttr || '';

  const handlePlayCard = () => {
    if (canPlayCard() && !alreadyPlayedCard) {
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

  const getValueName = (value) => {
    switch (value) {
      case 'J':
        return 'Jack';
      case 'Q':
        return 'Queen';
      case 'K':
        return 'King';
      default:
        return value;
    }
  };

  const getCardAltText = (cardKey) => {
    const suit = cardKey.slice(-1);
    let value = '';
    switch (cardKey[1]) {
      case 'c':
        value = 'Ace';
        break;
      case '0':
        value = 10;
        break;
      default:
        [value] = cardKey;
        break;
    }
    const name = getValueName(value);
    return `${name} of ${suit}`;
  };

  const setHighlightTimeout = () => { setTimeout(() => setHighlight(true), 500); };
  if (canPlayCard() && !alreadyPlayedCard) {
    setHighlightTimeout();
  } else if (highlight) {
    setHighlight(false);
  }


  if (imgSrc) {
    const img = classAttr
      ? <img src={imgSrc} alt={getCardAltText(cardKey)} id={cardKey} />
      : (
        <input
          className={highlight ? 'highlighted' : ''}
          type="image"
          src={imgSrc}
          alt={getCardAltText(cardKey)}
          id={cardKey}
          onClick={handlePlayCard}
          onKeyPress={handlePlayCard}
        />
      );


    return (
      <div className={`card ${classToAdd}`}>
        <div className="front">
          {img}
        </div>
      </div>
    );
  }
  return <div />;
};

Card.propTypes = {
  cardKey: PropTypes.string.isRequired,
  playerIndex: PropTypes.number,
  cardIndex: PropTypes.number,
  canPlayCard: PropTypes.func,
  classAttr: PropTypes.string,
  alreadyPlayedCard: PropTypes.bool,
  playedCard: PropTypes.func,
};

Card.defaultProps = {
  playerIndex: 0,
  cardIndex: 0,
  canPlayCard: () => {},
  classAttr: '',
  alreadyPlayedCard: false,
  playedCard: null,
};

export default Card;
