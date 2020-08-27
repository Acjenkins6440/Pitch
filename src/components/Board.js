import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Player from './Player';
import BoardMessages from './BoardMessages';
import {
  leaveGame, initOwnerListenValues, initPlayerListenValues, gameExists,
} from '../providers/GameProvider';

const Board = ({ userData, activeGame, setActiveGame }) => {
  const players = [];

  const isMyTurn = userData.uid === activeGame.playersTurn;

  const initListeners = () => {
    if (userData.uid === activeGame.owner.uid) {
      initOwnerListenValues(activeGame, setActiveGame);
    } else {
      initPlayerListenValues(setActiveGame, navigate);
    }
  };

  useEffect(() => {
    initListeners();
    if (!activeGame.gameKey) {
      navigate('/');
      return;
    }
    /* eslint-disable */
    return (() => { 
      if (gameExists()) {
        leaveGame(userData, activeGame, setActiveGame);
      }
    });
    /*eslint-disable */
  }, [activeGame.gameKey]);

  const mainPlayerIndex = activeGame.users.findIndex(user => user.uid === userData.uid);

  activeGame.users.forEach((user, index) => {
    players.push(<Player
      key={user.displayName}
      playerIndex={index}
      mainPlayerIndex={mainPlayerIndex}
      displayName={user.displayName}
      activeGame={activeGame}
    />);
  });

  return (
    <div id="board">
      {activeGame.status === 'in progress'
        ? players
        : <div />
      }
      {
        activeGame.phase !== 'throw'
      }
      <BoardMessages activeGame={activeGame} myTurn={isMyTurn} setActiveGame={setActiveGame} />
    </div>
  );
};

Board.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  activeGame: PropTypes.shape({
    gameKey: PropTypes.string,
    users: PropTypes.array,
    status: PropTypes.string,
    owner: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
    playersTurn: PropTypes.string,
    phase: PropTypes.string,
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default Board;
