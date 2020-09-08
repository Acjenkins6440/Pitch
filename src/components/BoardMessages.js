import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {
  startGame, getOwner, setBid, deal, pass,
} from '../providers/GameProvider';

const BoardMessages = ({ activeGame, setActiveGame, user }) => {
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

  let isDealer = false;
  let isMyTurn = false;
  if (activeGame.status === 'in progress') {
    isDealer = activeGame.dealer.uid === user.uid;
    isMyTurn = activeGame.playersTurn.uid === user.uid;
  }

  const handleBid = bid => setBid({ bid, player: user }, activeGame);

  const bidTwo = () => { handleBid(2); };
  const bidThree = () => { handleBid(3); };
  const bidFour = () => { handleBid(4); };
  const bidFive = () => { handleBid(5); };

  const handlePass = () => { pass(activeGame); };

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
      if (isDealer) {
        return (
          <div className="generic-container">
            <Button
              onClick={handleDeal}
              onKeyPress={handleDeal}
            >
              Click to Deal!
            </Button>
          </div>
        );
      }

      return null;
    } if (activeGame.phase === 'bid') {
      if (isMyTurn) {
        return (
          <div className="generic-container">
            <div>
              <p>Place your bid!</p>
            </div>
            <div>
              <Button
                onClick={handlePass}
                onKeyPress={handlePass}
                disabled={isDealer}
              >
                Pass
              </Button>
              <Button
                onClick={bidTwo}
                onKeyPress={bidTwo}
                disabled={activeGame.currentBid.bid >= 2}
              >
                2
              </Button>
              <Button
                onClick={bidThree}
                onKeyPress={bidThree}
                disabled={activeGame.currentBid.bid >= 3}
              >
                3
              </Button>
              <Button
                onClick={bidFour}
                onKeyPress={bidFour}
                disabled={activeGame.currentBid.bid >= 4}
              >
                4
              </Button>
              <Button
                onClick={bidFive}
                onKeyPress={bidFive}
                disabled={activeGame.currentBid.bid >= 5}
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
              {`Current Bid: ${activeGame.currentBid.bid} by ${activeGame.currentBid.player.displayName}`}
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
      {(activeGame.phase === 'bid' || activeGame.phase !== 'wait')
        ? (
          <div className="generic-container">
            <div>
              <p>
                turn:
                {activeGame.playersTurn ? activeGame.playersTurn.displayName : ''}
              </p>
              <p>
                phase:
                {activeGame.phase}
              </p>
              <p>
                bid:
                {activeGame.currentBid ? `${activeGame.currentBid.bid} by ${activeGame.currentBid.player.displayName}` : ''}
              </p>
            </div>
          </div>
        )
        : ''
      }
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
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired,
};

export default BoardMessages;
