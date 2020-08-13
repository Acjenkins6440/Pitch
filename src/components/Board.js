import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Player from './Player';
import { getActiveGame, leaveGame, initOwnerListenValues, initPlayerListenValues } from '../providers/GameProvider'

const Board = ({ userData, activeGame, setActiveGame }) => {
  const [phase, setPhase] = useState('lobby');
  const [listenersActive, setListenersActive] = useState(false)
  const players = [];
  const playerSeat = 0;
  console.log(activeGame)

  const initListeners = () => {
    if (userData.uid === activeGame.owner.uid) {
      initOwnerListenValues(activeGame, setActiveGame)
    }
    else {
      initPlayerListenValues(setActiveGame, navigate)
    }
    setListenersActive(true)
  }

  useEffect(() => {
    initListeners()
    return(() => {
      leaveGame(userData, activeGame, setActiveGame)
      setListenersActive(false)
    })
  }, [activeGame.gameKey])

  for (let i = 0; i < 4; i += 1) {
    const player = <Player key={i} playerNum={i} playerSeat={playerSeat} />;
    players.push(player);
  }
  return (
    <div id="board">
      {players}
      <div className="board-messages">
        <div className="generic-container">
          {activeGame.users.map((user, index) => {
            return (<div key={user.uid}><p>Player {index + 1}: {user.displayName}</p></div>)
          })}
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  userData: PropTypes.shape({

  }).isRequired,
};

export default Board;
