import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand';

const getPlayerPos = (playerIndex, mainPlayerIndex) => {
  const offset = mainPlayerIndex - playerIndex;

  if (offset === 0) {
    return 'bottom';
  }
  if (offset === 1 || offset === -3) {
    return 'right';
  }
  if (Math.abs(offset) === 2) {
    return 'top';
  }

  return 'left';
};

const Player = ({
  displayName, playerIndex, mainPlayerIndex, activeGame,
}) => {
  const className = `player ${getPlayerPos(playerIndex, mainPlayerIndex)}`;

  return (
    <div className={className}>
      <p>{displayName}</p>
      <Hand
        playerIndex={playerIndex}
        isPlayer={mainPlayerIndex === playerIndex}
        activeGame={activeGame}
      />
    </div>
  );
};

Player.propTypes = {
  playerIndex: PropTypes.number.isRequired,
  mainPlayerIndex: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
  activeGame: PropTypes.shape({

  }).isRequired,
};

export default Player;
