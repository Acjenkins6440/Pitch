import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

const Board = ({ playerSeat }) => {
  const players = [];

  for (let i = 0; i < 4; i += 1) {
    const player = <Player key={i} playerNum={i} playerSeat={playerSeat} />;
    players.push(player);
  }
  return (
    <div id="board">
      {players}
    </div>
  );
};

Board.propTypes = {
  playerSeat: PropTypes.number.isRequired,
};

export default Board;
