import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';


const Hand = ({ playerNum, playerSeat }) => {
  const defaultState = (playerNum === playerSeat) ? ['3H', 'KD', '3C', 'JH', '2D', '9D'] : ['blank_0', 'blank_1', 'blank_2', 'blank_3', 'blank_4', 'blank_5'];
  const [playerHand] = useState(defaultState);
  const cards = [];
  playerHand.forEach((card) => {
    cards.push(<Card cardKey={card} key={`${card}-${playerNum}`} />);
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
