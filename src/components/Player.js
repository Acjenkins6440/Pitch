import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand';


const getPlayerPos = (playerNum) => {
  if (playerNum === 0) {
    return 'bottom';
  }
  if (playerNum === 1) {
    return 'left';
  }
  if (playerNum === 2) {
    return 'top';
  }

  return 'right';
};

const Player = ({ playerNum, playerSeat }) => {
  const className = `player ${getPlayerPos(playerNum)}`;

  return (
    <div className={className}>
      <Hand playerSeat={playerSeat} playerNum={playerNum} />
    </div>
  );
};

Player.propTypes = {
  playerNum: PropTypes.number.isRequired,
  playerSeat: PropTypes.number.isRequired,
};

export default Player;
