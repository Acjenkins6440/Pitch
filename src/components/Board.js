import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import Hand from './Hand';
import Card from './Card';

const Board = ({ playerSeat }) => {
  const players = [];

  for (let i = 0; i < 4; i++) {
    const player = <Player key={i} playerNum={i} playerSeat={playerSeat} />;
    players.push(player);
  }
  console.log(players);
  return (
    <div id="board">
      {players}
    </div>
  );
};

export default Board;
