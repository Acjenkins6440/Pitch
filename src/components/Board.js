import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import Button from 'react-bootstrap/Button';
import { logout } from '../providers/UserProvider';

const Board = ({ playerSeat }) => {
  const players = [];

  for (let i = 0; i < 4; i++) {
    const player = <Player key={i} playerNum={i} playerSeat={playerSeat} />;
    players.push(player);
  }
  console.log(players);
  return (
    <div id="board">
      <Button onClick={logout} />
      {players}
    </div>
  );
};

export default Board;
