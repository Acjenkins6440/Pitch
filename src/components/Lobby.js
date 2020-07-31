import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame'

const Lobby = ({ userData, lobbyState, setLobbyState }) => {
  const getLobbyComponent = () => {
    if(lobbyState === 'lobby'){
      return (
        <div id="lobby">
          <div className="button-container">
            <Button name="create" onClick={onClick} onKeyPress={onClick} className="lobby-button">START GAME</Button>
            <Button name="join" onClick={onClick} onKeyPress={onClick} className="lobby-button sm">JOIN GAME</Button>
          </div>
        </div>
      )
    }
    else if(lobbyState === 'createGame'){
      return(
        <CreateGame userData={userData} backToLobby={onClick}/>
      )
    }
    else if(lobbyState === 'joinGame'){
      return(
        <JoinGame userDate={userData} backToLobby={onClick}/>
      )
    }
  }

  const onClick = (event) => {
    const { name } = event.currentTarget
    let newState = ''
    if(name === 'create'){
      newState = 'createGame'
    }
    else if(name === 'join'){
      newState = 'joinGame'
    }
    else{
      newState = 'lobby'
    }
    setLobbyState(newState)
  }
  
  return (
    <div>
      {getLobbyComponent()}
    </div>
  )
};

export default Lobby;
