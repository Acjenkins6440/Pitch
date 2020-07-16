import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';


const Hand = ({ playerNum, playerSeat }) => {
  const defaultState = (playerNum === playerSeat) ? ['3H', 'KD', '3C', 'JH', '2D', '9D'] : ['blank', 'blank', 'blank', 'blank', 'blank', 'blank'];
  const [playerHand] = useState(defaultState);
  const cards = [];
  playerHand.forEach((card) => {
    cards.push(<Card cardKey={card} key={card} />);
  });
  return (
    <div>
      {cards}
    </div>
  );
};

Hand.propTypes = {
  playerNum: PropTypes.number.isRequired,
  playerSeat: PropTypes.number.isRequired,
};

export default Hand;
