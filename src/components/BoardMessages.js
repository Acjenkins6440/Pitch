import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  startGame, getOwner, setBid, deal, pass,
} from '../providers/GameProvider';

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
    if (activeGame.phase === 'deal' || activeGame.phase === 'score') {
      const team1 = [activeGame.users[0], activeGame.users[2]];
      const team2 = [activeGame.users[1], activeGame.users[3]];
      return (
        <div className="generic-container">
          <Container>
            <Row>
              <Col><h3>Scoreboard</h3></Col>
            </Row>
            <Row><hr /></Row>
            <Row>
              <Col>
                <p>{`${team1[0].displayName} - ${team1[1].displayName}`}</p>
              </Col>
              <Col>
                <p>{`${team2[0].displayName} - ${team2[1].displayName}`}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
              <Col>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{activeGame.score.team1}</p>
              </Col>
              <Col>
                <p>{activeGame.score.team2}</p>
              </Col>
            </Row>
          </Container>
          {activeGame.status === 'game over'
            ? <div>Game over!</div>
            : <div />
          }
          {isDealer && activeGame.phase === 'deal' && activeGame.status === 'in progress'
            ? (
              <Button
                onClick={handleDeal}
                onKeyPress={handleDeal}
              >
                Click to Deal!
              </Button>
            )
            : <div />}
        </div>
      );
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
                disabled={isDealer && !activeGame.currentBid.bid}
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
