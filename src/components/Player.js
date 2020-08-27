import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand';

const getPlayerPos = (playerIndex, mainPlayerIndex) => {
  const offset = mainPlayerIndex - playerIndex
  
  if(offset === 0){
    return 'bottom'
  }
  else if(offset === 1 || offset === -3){
    return 'right'
  }
  else if(Math.abs(offset) === 2){
    return 'top'
  }
  else{
    return 'left'
  }
}

const Player = ({ displayName, playerIndex, mainPlayerIndex, activeGame }) => {
  const isPlayer = playerIndex === mainPlayerIndex
  const className = `player ${getPlayerPos(playerIndex, mainPlayerIndex)}`;

  return (
    <div className={className}>
      <p>{displayName}</p>
      <Hand playerIndex={playerIndex} isPlayer={mainPlayerIndex === playerIndex} activeGame={activeGame} />
    </div>
  );
};

Player.propTypes = {
  playerIndex: PropTypes.number.isRequired,
  mainPlayerIndex: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
};

export default Player;
