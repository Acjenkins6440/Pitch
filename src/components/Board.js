import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

const Board = ({ gameData }) => {
  const [phase, setPhase] = useState('lobby')
  console.log(gameData)
  const players = [];
  const playerSeat = 0;

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
  gameData: PropTypes.shape({
    
  }).isRequired,
};

export default Board;
