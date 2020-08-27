import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {
  startGame, getOwner, setBid, deal,
} from '../providers/GameProvider';

const BoardMessages = ({ activeGame, setActiveGame, myTurn }) => {
  const isOwner = getOwner();

  const startGameDisabled = () => {
    if (activeGame.botsEnabled) {
      return false;
    }

    return activeGame.users.length !== 4;
  };


  const handleStartGame = () => {
    startGame(activeGame, setActiveGame);
  };

  const handleDeal = () => {
    deal(activeGame, setActiveGame);
  };

  const getBoardMessages = () => {
    if (activeGame.status === 'lobby') {
      return (
        <div className="generic-container">
          <div>
            <p>Players:</p>
            {activeGame.users.map((user, index) => (
              <div className="player-wrapper" key={user.uid}>
                <p>
                  Player
                  {' '}
                  {index + 1}
                  :
                  {' '}
                  {user.displayName}
                </p>
              </div>
            ))}
            {isOwner && activeGame.status === 'lobby'
              ? (
                <Button
                  onClick={handleStartGame}
                  onKeyPress={handleStartGame}
                  disabled={startGameDisabled()}
                >
                  Start Game
                </Button>
              )
              : <div />
            }
          </div>
        </div>
      );
    }
    if (activeGame.phase === 'deal') {
      if (myTurn) {
        return (
          <div className="generic-container">
            <Button onClick={handleDeal} onKeyPress={handleDeal}>Click to Deal!</Button>
          </div>
        );
      }

      return null;
    } if (activeGame.phase === 'bid') {
      if (myTurn) {
        return (
          <div className="generic-container">
            <div>
              <p>Place your bid!</p>
            </div>
            <div>
              <Button
                onClick={setBid(2)}
                onKeyPress={setBid(2)}
                disabled={activeGame.currentBid < 2}
              >
                2
              </Button>
              <Button
                onClick={setBid(3)}
                onKeyPress={setBid(3)}
                disabled={activeGame.currentBid < 3}
              >
                3
              </Button>
              <Button
                onClick={setBid(4)}
                onKeyPress={setBid(4)}
                disabled={activeGame.currentBid < 4}
              >
                4
              </Button>
              <Button
                onClick={setBid(5)}
                onKeyPress={setBid(5)}
                disabled={activeGame.currentBid < 5}
              >
                Shoot the moon!
              </Button>
            </div>
          </div>
        );
      }
      return (
        <div className="generic-container">
          <div>
            <p>
              Current Bid:
              {activeGame.currentBid}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="board-messages">
      {getBoardMessages()}
    </div>
  );
};

BoardMessages.propTypes = {
  activeGame: PropTypes.shape({
    botsEnabled: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    phase: PropTypes.string,
    currentBid: PropTypes.shape({
      bid: PropTypes.number,
      player: PropTypes.string,
    }),
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired,
  myTurn: PropTypes.bool.isRequired,
};

export default BoardMessages;
