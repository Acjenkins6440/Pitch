import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Player from './Player';
import BoardMessages from './BoardMessages';
import {
  leaveGame, initOwnerListenValues, initPlayerListenValues, gameExists
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
    if(!activeGame.gameKey){
      navigate('/')
      return
    }
    return (() => {
      if(gameExists){
        debugger
        leaveGame(userData, activeGame, setActiveGame);
      }
    });
  }, [activeGame.gameKey]);

  for (let i = 0; i < 4; i += 1) {
    const player = <Player key={i} playerNum={i} playerSeat={playerSeat} />;
    players.push(player);
  }

  return (
    <div id="board">
      {activeGame.status === 'in progress' ?
      players :
      <div></div>
      }
      <BoardMessages activeGame={activeGame} />
    </div>
  );
};

Board.propTypes = {
  userData: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired,
  activeGame: PropTypes.shape({
    gameKey: PropTypes.string,
    users: PropTypes.array,
    status: PropTypes.string,
    owner: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default Board;
