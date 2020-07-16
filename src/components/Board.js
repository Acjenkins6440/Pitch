import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Player from './Player';
import { logout } from '../providers/UserProvider';

const Board = ({ playerSeat }) => {
  const players = [];

  for (let i = 0; i < 4; i += 1) {
    const player = <Player key={i} playerNum={i} playerSeat={playerSeat} />;
    players.push(player);
  }
  return (
    <div id="board">
      <Button className="logout-button" onClick={logout}>Logout</Button>
      {players}
    </div>
  );
};

Board.propTypes = {
  playerSeat: PropTypes.number.isRequired,
};

export default Board;
