import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { getActiveGames, joinGame } from '../providers/GameProvider';

const JoinGame = ({ userData, backToLobby, setActiveGame }) => {
  const [activeGames, setActiveGames] = useState([]);

  const initGames = () => {
    getActiveGames(setActiveGames);
  };

  useEffect(() => {
    initGames();
  }, []);

  const getTimeDiff = (gameKey) => {
    const timeInMs = parseInt(gameKey.slice(-13), 10);
    const timeDiff = new Date().getTime() - timeInMs;
    const minutes = Math.floor(timeDiff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const minutesLeft = Math.floor(minutes - (hours * 60));
    
    return `${hours < 10 ? '0' : ''}${hours}:${minutesLeft < 10 ? '0' : ''}${minutesLeft}`;
  };

  const promptPassword = gameData => (!!(gameData.password));
  // put a modal here

  const handleClick = (gameData) => {
    if (gameData.passwordEnabled) {
      promptPassword(gameData);
    }
    joinGame(userData, gameData, setActiveGame, navigate);
  };

  const getJoinLink = (gameKey) => {
    const gameData = activeGames[gameKey];
    if (Object.keys(gameData.users).length < 4) {
      return (
        <Button onClick={handleClick(gameData)} onKeyPress={handleClick(gameData)}>Join</Button>
      );
    }

    return <p>Join</p>;
  };

  const getRow = (gameKey) => {
    const gameData = activeGames[gameKey];
    const padlockSrc = `/public/images/${!gameData.passwordEnabled ? 'un' : ''}locked_game.svg`;
    return (
      <tr key={gameKey}>
        <td className="status">{gameData.status}</td>
        <td>{gameData.name}</td>
        <td>{`${Object.keys(gameData.users).length} / 4`}</td>
        <td>{gameData.botsEnabled ? 'Yes' : 'No'}</td>
        <td>{getTimeDiff(gameKey)}</td>
        <td>{getJoinLink(gameKey)}</td>
        <td><img src={padlockSrc} alt={gameData.passwordEnabled ? 'locked game' : 'unlocked game'} /></td>
      </tr>
    );
  };

  return (
    <div>
      <div className="join-game-table-container generic-container">
        <h1>Join a Game</h1>
        <Table className="join-game-table">
          <thead>
            <tr>
              <th className="status">Status</th>
              <th>Title</th>
              <th>Players</th>
              <th>Bots Enabled</th>
              <th>Active time</th>
              <th>Join</th>
              <th>Private</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(activeGames).map(key => (
              getRow(key)
            ))}
          </tbody>
        </Table>
        <Button onClick={backToLobby} onKeyPress={backToLobby}>Back to Lobby</Button>
      </div>
    </div>
  );
};

JoinGame.propTypes = {
  userData: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

JoinGame.propTypes = {
  backToLobby: PropTypes.func.isRequired,
};

export default JoinGame;
