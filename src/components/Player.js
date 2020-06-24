import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand';


const getPlayerPos = (playerNum) => {
  if(playerNum === 0) {
    return 'bottom'
  }
  else if(playerNum === 1) {
    return 'left'
  }
  else if(playerNum === 2) {
    return 'top'
  }
  else {
    return 'right'
  }
}

const Player = ({ playerNum, playerSeat }) => {
  const className = 'player ' + getPlayerPos(playerNum)

  return (
    <div className={className}>
      <Hand playerSeat={playerSeat} playerNum={playerNum}/>
    </div>
  )
}

export default Player;
