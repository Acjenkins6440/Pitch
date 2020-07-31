import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getActiveGames } from '../providers/GameProvider';

const JoinGame = ({ userData, backToLobby }) => {
  const [activeGames, setActiveGames] = useState([])

  const initGames = () => {
    getActiveGames(setActiveGames)
  }
  
  useEffect(() => {
    initGames()
  }, []);

  const getTimeDiff = (gameKey) => {
    const timeInMs = parseInt(gameKey.slice(-13))
    const timeDiff = new Date().getTime() - timeInMs
    const minutes = Math.floor(timeDiff / 1000 / 60)
    const hours = Math.floor(minutes / 60 )
    const minutesLeft = Math.floor(minutes - (hours * 60))
    return `${hours}:${minutesLeft}`
  }

  const getJoinLink = () => {
    return <a>Join</a>
  }

  const getRow = (gameKey) => {
    const gameData = activeGames[gameKey]
    const padlockSrc = `/public/images/${!gameData.passwordEnabled ? 'un' : '' }locked_game.svg`
    return (
      <tr key={gameKey}>
        <td className="status">{gameData.status}</td>
        <td>{gameData.name}</td>
        <td>{`${Object.keys(gameData.users).length} / 4`}</td>
        <td>{gameData.botsEnabled ? 'Yes' : 'No'}</td>
        <td>{getTimeDiff(gameKey)}</td>
        <td>{getJoinLink(gameKey)}</td>
        <td><img src={padlockSrc} /></td>
      </tr>
    )
  }

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
            {Object.keys(activeGames).map((key) => (
              getRow(key)  
            ))}
          </tbody>
        </Table>
        <Button onClick={backToLobby} onKeyPress={backToLobby}>Back to Lobby</Button>
      </div>
    </div>
  )
}

export default JoinGame