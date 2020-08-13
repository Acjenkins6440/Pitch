import React from 'react'
import { startGame, getOwner } from '../providers/GameProvider'
import Button from 'react-bootstrap/Button'

const BoardMessages = ({ activeGame }) => {
  const isOwner = getOwner()

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
            <Button onClick={startGame} onKeyPress={startGame}>Start Game</Button>
            : <div></div>
          }
        </div>
      </div>
    </div>
  )
}
export default BoardMessages