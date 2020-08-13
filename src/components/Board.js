import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Player from './Player';
import {
  leaveGame, initOwnerListenValues, initPlayerListenValues,
} from '../providers/GameProvider';

const Board = ({ userData, activeGame, setActiveGame }) => {
  const players = [];
  const playerSeat = 0;

  const initListeners = () => {
    if (userData.uid === activeGame.owner.uid) {
      initOwnerListenValues(activeGame, setActiveGame);
    } else {
      initPlayerListenValues(setActiveGame, navigate);
    }
  };

  useEffect(() => {
    initListeners();
    return (() => {
      leaveGame(userData, activeGame, setActiveGame);
    });
  }, [activeGame.gameKey]);

  for (let i = 0; i < 4; i += 1) {
    const player = <Player key={i} playerNum={i} playerSeat={playerSeat} />;
    players.push(player);
  }
  return (
    <div id="board">
      {players}
      <div className="board-messages">
        <div className="generic-container">
          {activeGame.users.map((user, index) => (
            <div key={user.uid}>
              <p>
                Player
                {index + 1}
                :
                {user.displayName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  activeGame: PropTypes.shape({
    gameKey: PropTypes.string,
    users: PropTypes.array,
    status: PropTypes.string,
    owner: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default Board;
