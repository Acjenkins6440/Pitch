import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import BidInterface from './partials/BidInterface';
import ScoreBoard from './partials/ScoreBoard';
import { startGame, getOwner } from '../providers/GameProvider';

const BoardMessages = ({ activeGame, setActiveGame, userIndex }) => {
  const isOwner = getOwner();
  const user = activeGame.users[userIndex];

  const startGameDisabled = () => {
    if (activeGame.botsEnabled) {
      return false;
    }

    return activeGame.users.length !== 4;
  };

  const handleStartGame = () => {
    startGame(activeGame, setActiveGame);
  };

  let isDealer = false;
  let isMyTurn = false;
  if (activeGame.status === 'in progress') {
    isDealer = activeGame.dealer.uid === user.uid;
    isMyTurn = activeGame.playersTurn.uid === user.uid;
  }

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
    if (activeGame.phase === 'deal' || activeGame.phase === 'score') {
      return (
        <ScoreBoard
          setActiveGame={setActiveGame}
          activeGame={activeGame}
          isDealer={isDealer}
        />
      );
    }
    if (activeGame.phase === 'bid') {
      if (isMyTurn) {
        return <BidInterface isDealer={isDealer} activeGame={activeGame} user={user} />;
      }
      return (
        <div className="generic-container">
          <div>
            <p>
              {`Current Bid: ${activeGame.currentBid.bid} by ${activeGame.currentBid.player.displayName}`}
            </p>
          </div>
        </div>
      );
    }
    if (activeGame.phase === 'play card') {
      return (
        <div className="generic-container">
          <div>
            <p>Play a card!</p>
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
    score: PropTypes.shape({
      team1: PropTypes.number,
      team2: PropTypes.number,
    }),
    currentBid: PropTypes.shape({
      bid: PropTypes.number,
      player: PropTypes.shape({
        uid: PropTypes.string,
        displayName: PropTypes.string,
      }),
    }),
    dealer: PropTypes.shape({
      uid: PropTypes.string,
    }),
    playersTurn: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
    }),
  }).isRequired,
  userIndex: PropTypes.number.isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default BoardMessages;
