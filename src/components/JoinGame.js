import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import { getActiveGames, joinGame } from '../providers/GameProvider';

const numberOnPage = 5;

const JoinGame = ({ userData, backToLobby, setActiveGame }) => {
  const [activeGames, setActiveGames] = useState([]);
  const [paginatedGames, setPaginatedGames] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const paginationItems = [];
  for (let i = 1; i <= (Math.ceil(activeGames.length / numberOnPage)); i += 1) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === pageNumber}
        onClick={() => setPageNumber(i)}
        onKeyPress={() => setPageNumber(i)}
      >
        {i}
      </Pagination.Item>,
    );
  }

  const initGames = () => {
    getActiveGames(setActiveGames)
  };

  useEffect(() => {
    if(!activeGames.length){
      initGames();
    }
  }, []);

  useEffect(() => {
    const begin = (pageNumber - 1) * numberOnPage;
    const end = begin + numberOnPage;
    setPaginatedGames(activeGames.slice(begin, end));
  }, [pageNumber, activeGames]);

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
    const gameKey = gameData.key;
    if (gameData.passwordEnabled) {
      promptPassword(gameData);
    }
    joinGame(userData, gameKey, setActiveGame, navigate, setError);
  };

  const getJoinLink = (gameData) => {
    if (Object.keys(gameData.users).length < 4) {
      return (
        <Button
          onClick={() => handleClick(gameData)}
          onKeyPress={() => handleClick(gameData)}
        >
          Join
        </Button>
      );
    }

    return <p>Join</p>;
  };

  const getRow = (gameData) => {
    const gameKey = gameData.key;
    const padlockSrc = `/public/images/${!gameData.passwordEnabled ? 'un' : ''}locked_game.svg`;
    return (
      <tr key={gameKey}>
        <td className="status">{gameData.status}</td>
        <td>{gameData.name}</td>
        <td>{`${gameData.users.length} / 4`}</td>
        <td>{gameData.botsEnabled ? 'Yes' : 'No'}</td>
        <td>{getTimeDiff(gameKey)}</td>
        <td>{getJoinLink(gameData)}</td>
        <td><img src={padlockSrc} alt={gameData.passwordEnabled ? 'locked game' : 'unlocked game'} /></td>
      </tr>
    );
  };

  const getRows = () => (
    paginatedGames.map(gameData => (
      getRow(gameData)
    ))
  );

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
            {activeGames
              ? getRows()
              : <tr />}
          </tbody>
        </Table>
        <div className="center">
          <Pagination>
            {paginationItems}
          </Pagination>
        </div>
        <Button onClick={backToLobby} onKeyPress={backToLobby}>Back to Lobby</Button>
        {error
          ? (<p className="error">{`${error.code}: ${error.message}`}</p>)
          : ''
          }
      </div>
    </div>
  );
};

JoinGame.propTypes = {
  userData: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  backToLobby: PropTypes.func.isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default JoinGame;
