import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Player from './Player';
import BoardMessages from './BoardMessages';
import ScorePile from './ScorePile';
import {
  leaveGame, initOwnerListenValues, initPlayerListenValues, gameExists,
} from '../providers/GameProvider';

const Board = ({ userData, activeGame, setActiveGame }) => {
  const players = [];
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
      activeGame={activeGame}
      user={user}
    />);
  });

  return (
    <div id="board">
      {activeGame.status === 'in progress'
        ? players
        : <div />
      }
      {activeGame.status === 'in progress'
        ? <ScorePile activeGame={activeGame} mainPlayerIndex={mainPlayerIndex} />
        : <div />
      }
      <BoardMessages 
        activeGame={activeGame} 
        setActiveGame={setActiveGame}
        userIndex={activeGame.users.findIndex((user) => userData.uid === user.uid)}
      />
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
    playersTurn: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
    }),
    phase: PropTypes.string,
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default Board;
