import React from 'react'
import { startGame, getOwner } from '../providers/GameProvider'
import Button from 'react-bootstrap/Button'

const BoardMessages = ({ activeGame }) => {
  const isOwner = getOwner()

  const startGameDisabled = () => {
    if(activeGame.botsEnabled){
      return false
    }
    else{
      return (activeGames.users.length === 4) ? false : true
    }
  }
  
  const handleStartGame = () => {
    startGame(activeGame)
  }

  return(
    <div className="board-messages">
      <div className="generic-container">
        <div>
          <p>Players:</p>
          {activeGame.users.map((user, index) => (
            <div className="player-wrapper" key={user.uid}>
              <p>
                Player {index + 1}: {user.displayName}
              </p>
            </div>
          ))}
          { isOwner ? 
            <Button onClick={handleStartGame} onKeyPress={handleStartGame} disabled={startGameDisabled()}>Start Game</Button>
            : <div></div>
          }
        </div>
      </div>
    </div>
  )
}
export default BoardMessages