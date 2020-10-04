import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { deal } from '../../providers/GameProvider';

const ScoreBoard = ({ activeGame, isDealer, setActiveGame }) => {
  const team1 = [activeGame.users[0], activeGame.users[2]];
  const team2 = [activeGame.users[1], activeGame.users[3]];

  const handleDeal = () => {
    deal(activeGame, setActiveGame);
  };

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
};

ScoreBoard.propTypes = {
  activeGame: PropTypes.shape({
    users: PropTypes.array,
    score: PropTypes.shape({
      team1: PropTypes.number,
      team2: PropTypes.number,
    }),
    phase: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  setActiveGame: PropTypes.func.isRequired,
  isDealer: PropTypes.bool.isRequired,
};

export default ScoreBoard;
