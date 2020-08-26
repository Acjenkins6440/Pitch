import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';


const Hand = ({ playerIndex, isPlayer }) => {
  const defaultState = (isPlayer) ? ['3H', 'KD', '3C', 'JH', '2D', '9D'] : ['blank_0', 'blank_1', 'blank_2', 'blank_3', 'blank_4', 'blank_5'];
  const [playerHand, setPlayerHand] = useState(defaultState);
  const cards = [];
  playerHand.forEach((card) => {
    cards.push(<Card cardKey={card} key={`${card} - ${playerIndex}`} />);
  });
  return (
    <div>
      {cards}
    </div>
  );
};

Hand.propTypes = {

};

export default Hand;
