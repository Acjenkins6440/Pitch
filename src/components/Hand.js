import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';


const Hand = ({ playerIndex, isPlayer, activeGame }) => {
  const cards = [];
  const playerHand = activeGame.users[playerIndex].hand;
  const handLength = playerHand && activeGame.users[playerIndex].hand.length;


  if (handLength) {
    if (!isPlayer) {
      playerHand.length = 0;
      for (let i = 0; i < handLength; i += 1) {
        playerHand.push(`blank${i}`);
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
  playerIndex: PropTypes.number.isRequired,
  isPlayer: PropTypes.bool.isRequired,
  activeGame: PropTypes.shape({
    users: PropTypes.array,
  }).isRequired,
};

export default Hand;
