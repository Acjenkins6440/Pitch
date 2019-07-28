import React from 'react';
import injectSheet from 'react-jss';
import cardStyles from './cardStyles.jss';

const numMap = {
  "1": "A",
  "11": "J",
  "12": "Q",
  "13": "K"
};
const suitMap = {
  "d": "♦",
  "h": "♥",
  "c": "♣",
  "s": "♠"
};

const keyToNum = (cardKey) => {
  const numKey = (cardKey.length == 3) ? cardKey.slice(-2) : cardKey.slice(-1);
  return Object.keys(numMap).includes(numKey) ? numMap[numKey] : numKey
};

const keyToSuit = (cardKey) => {
  return suitMap[cardKey[0]];
}

const UnstyledCard = ({ cardKey, classes }) => (
  <div className={classes.card}>
    <div className={(keyToSuit(cardKey) === '♥' || keyToSuit(cardKey) === '♦') ? classes.red_suit : classes.black_suit}>
      <span className={classes.ulSymbol}>{keyToSuit(cardKey)}</span>
      <span className={classes.number}>{keyToNum(cardKey)}</span>
      <span className={classes.brSymbol}>{keyToSuit(cardKey)}</span>
    </div>
  </div>
);
const Card = injectSheet(cardStyles)(UnstyledCard);

export default Card;
