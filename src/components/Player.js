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
  playerIndex, mainPlayerIndex, activeGame, user,
}) => {
  const className = `player ${getPlayerPos(playerIndex, mainPlayerIndex)}`;
  const isMyTurn = activeGame.playersTurn.uid === user.uid;
  const boldenName = isMyTurn
    && (activeGame.phase === 'bid'
    || activeGame.phase === 'play card');

  return (
    <div className={className}>
      <p className={boldenName ? 'big-n-bold' : ''}>{user.displayName}</p>
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
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  activeGame: PropTypes.shape({
    playersTurn: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
    }),
    phase: PropTypes.string,
  }).isRequired,
};

export default Player;
