import React from 'react';
import injectSheet from 'react-jss';
import cardStyles from './cardStyles.jss';

const UnstyledCard = ({ card, index, classes }) => (
  <div className={classes.card}>
    <div className={(card.suit === '♥' || card.suit === '♦') ? classes.red_suit : classes.black_suit}>
      <span className={classes.ulSymbol}>{card.suit}</span>
      <span className={classes.number}>{card.number}</span>
      <span className={classes.brSymbol}>{card.suit}</span>
    </div>
  </div>
);
const Card = injectSheet(cardStyles)(UnstyledCard);

export default Card;
