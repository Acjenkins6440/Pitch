import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';



const Hand = ({ playerNum, playerSeat }) => {
  const defaultState = (playerNum == playerSeat) ? ['3H', 'KD', '3C', 'JH', '2D', '9D'] : ['blank', 'blank', 'blank', 'blank', 'blank', 'blank']
  const [playerHand, setPlayerHand] = useState(defaultState)
  const cards = []
  playerHand.forEach((card, index) => {
    cards.push(<Card cardKey={card} key={card + index} />)
  })
  return(
    <div>
      {cards}
    </div>
  )
}

export default Hand;
