import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';


const Hand = ({ playerIndex, isPlayer, activeGame }) => {
  const cards = [];
  const playerHand = activeGame.users[playerIndex].hand
  const handLength = playerHand && activeGame.users[playerIndex].hand.length 


  if(handLength){
    if (!isPlayer) {
      playerHand.length = 0
      for (var i = 0; i < handLength; i++) {
        playerHand.push(`blank${i}`)
      }
    }
    playerHand.forEach((card) => {
      cards.push(<Card cardKey={card} key={`${card} - ${playerIndex}`} />);
    });
  }

  return (
    <div>
      {cards}
    </div>
  );
};

Hand.propTypes = {

};

export default Hand;
