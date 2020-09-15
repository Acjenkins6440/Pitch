import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { canPlayCard, cantFollowSuit } from '../providers/ScoreProvider'

const Hand = ({ playerIndex, isPlayer, activeGame }) => {
  const cards = [];
  const playerHand = activeGame.users[playerIndex].hand;
  const handLength = playerHand && activeGame.users[playerIndex].hand.length;
  const isMyTurn = activeGame.playersTurn.uid === activeGame.users[playerIndex].uid
  const pickAnySuit = cantFollowSuit(playerHand, activeGame.inPlay, isPlayer)

  if (handLength) {
    if (!isPlayer) {
      playerHand.length = 0;
      for (let i = 0; i < handLength; i += 1) {
        const blankCard = { cardKey: `blank${i}`, blank: true }
        playerHand.push(blankCard);
      }
    }
    playerHand.forEach((card, index) => {
      cards.push(
      <Card 
        cardKey={card.cardKey} 
        cardIndex={index} 
        key={`${card.cardKey} - ${playerIndex}`} 
        canPlayCard={canPlayCard(card, activeGame, playerHand, isMyTurn, pickAnySuit)} 
        playerIndex={playerIndex}
      />);
    });
  }

  return (
    <div>
      {cards}
    </div>
  );
};

Hand.propTypes = {
  playerIndex: PropTypes.number.isRequired,
  isPlayer: PropTypes.bool.isRequired,
  activeGame: PropTypes.shape({
    users: PropTypes.array,
  }).isRequired,
};

export default Hand;
