import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cardStyles from './cardStyles.jss';

const numMap = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
};
const suitMap = {
  d: '♦',
  h: '♥',
  c: '♣',
  s: '♠',
};

const keyToNum = (cardKey) => {
  const numKey = (cardKey.length === 3) ? cardKey.slice(-2) : cardKey.slice(-1);
  return Object.keys(numMap).includes(numKey) ? numMap[numKey] : numKey;
};

const keyToSuit = cardKey => suitMap[cardKey[0]];

const UnstyledCard = ({ cardKey, classes }) => {
  const card = {
    suit: keyToSuit(cardKey),
    number: keyToNum(cardKey),
  };
  return (
    <div className={classes.card}>
      <div className={(card.suit === '♥' || card.suit === '♦') ? classes.redSuit : classes.blackSuit}>
        <span className={classes.ulSymbol}>{card.suit}</span>
        <span className={classes.number}>{card.number}</span>
        <span className={classes.brSymbol}>{card.suit}</span>
      </div>
    </div>
  );
};
const Card = injectSheet(cardStyles)(UnstyledCard);

UnstyledCard.propTypes = {
  cardKey: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    blackSuit: PropTypes.string.isRequired,
    brSymbol: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    redSuit: PropTypes.string.isRequired,
    ulSymbol: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
