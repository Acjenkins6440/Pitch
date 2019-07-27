import injectSheet from 'react-jss';
import Card from './Card';
import React from 'react';
// import handStyles from './handStyles.jss';

const getCardObject = (card) => {
  const newCard = {};
  switch (card[0]) {
    case "d":
      newCard.suit = "♦";
      break;
    case "s":
      newCard.suit = "♠";
      break;
    case "c":
      newCard.suit = "♣";
      break;
    default:
      newCard.suit = "♥";
      break;
  }

  if(card[2]){
    newCard.number = card.slice(-2);
  }
  else{
    newCard.number = card.slice(-1);
  }

  switch (newCard.number) {
    case '1':
      newCard.number = "A";
      break;
    case '11':
      newCard.number = "J";
      break;
    case '12':
      newCard.number = "Q";
      break;
    case '13':
      newCard.number = "K";
      break;
    default:
      break;
  }

  return newCard;
}

const unstyledHand = ({ handArray, playerIndex }) => (
  <div>
    {handArray.map((card, cardIndex) => {
      return <Card card={getCardObject(card)} cardIndex={cardIndex} />
    })}

  </div>
);

export default unstyledHand;
