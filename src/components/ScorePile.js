import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from './Card';

const ScorePile = ({ activeGame, mainPlayerIndex }) => {
  const cards = activeGame.inPlay ? activeGame.inPlay : [];
  const positions = {
    top: null,
    right: null,
    bottom: null,
    left: null,
  };

  const getCardPos = (card) => {
    const playerUID = card.player.uid;
    const playerIndex = activeGame.users.findIndex(player => player.uid === playerUID);
    const offset = mainPlayerIndex - playerIndex;

    if (offset === 0) {
      return 'bottom';
    }
    if (offset === 1 || offset === -3) {
      return 'right';
    }
    if (Math.abs(offset) === 2) {
      return 'top';
    }

    return 'left';
  };

  const getCardComponent = (card, cardPos) => <Card classAttr={cardPos} cardKey={card.cardKey} key={`${card.cardKey} - in-play`} />;

  const getFilledPositions = () => {
    cards.forEach((card) => {
      const cardPos = getCardPos(card);
      positions[cardPos] = getCardComponent(card, cardPos);
    });
  };

  getFilledPositions();

  return activeGame.phase === 'wait' || activeGame.phase === 'play card'
    ? (
      <Container className="in-play">
        <Row>
          <Col />
          <Col>{positions.top ? positions.top : ''}</Col>
          <Col />
        </Row>
        <Row>
          <Col>{positions.left ? positions.left : ''}</Col>
          <Col />
          <Col>{positions.right ? positions.right : ''}</Col>
        </Row>
        <Row>
          <Col />
          <Col>{positions.bottom ? positions.bottom : ''}</Col>
          <Col />
        </Row>
      </Container>
    )
    : <div />;
};

ScorePile.propTypes = {
  activeGame: PropTypes.shape({
    inPlay: PropTypes.array,
    users: PropTypes.array,
    phase: PropTypes.string,
  }).isRequired,
  mainPlayerIndex: PropTypes.number.isRequired,
};

export default ScorePile;
