import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

const Lobby = ({ userData, lobbyState, setLobbyState }) => {
  const onClick = (event) => {
    const { name } = event.currentTarget;
    let newState = '';
    if (name === 'create') {
      newState = 'createGame';
    } else if (name === 'join') {
      newState = 'joinGame';
    } else {
      newState = 'lobby';
    }
    setLobbyState(newState);
  };

  const getLobbyComponent = () => {
    if (lobbyState === 'lobby') {
      return (
        <div id="lobby">
          <div className="button-container">
            <Button name="create" onClick={onClick} onKeyPress={onClick} className="lobby-button">START GAME</Button>
            <Button name="join" onClick={onClick} onKeyPress={onClick} className="lobby-button sm">JOIN GAME</Button>
          </div>
        </div>
      );
    }
    if (lobbyState === 'createGame') {
      return (
        <CreateGame userData={userData} backToLobby={onClick} />
      );
    }
    return (
      <JoinGame userDate={userData} backToLobby={onClick} />
    );
  };

  return (
    <div>
      {getLobbyComponent()}
    </div>
  );
};

Lobby.propTypes = {
  userData: PropTypes.shape({}).isRequired,
  lobbyState: PropTypes.string.isRequired,
  setLobbyState: PropTypes.func.isRequired,
};

export default Lobby;
