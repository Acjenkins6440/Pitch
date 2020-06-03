import React from 'react';
import PropTypes from 'prop-types';

import Player from './Player';
import Hand from './Hand';
import Card from './Card';

const Board = ({
  deck, hands, playerNum, dealHands, selectPlayer, remoteShuffleDeck,
}) => (
  <div>
    <h1>Draw Some Cards!</h1>
    <h2>Click to shuffle!</h2>
    <button type="button" onClick={() => remoteShuffleDeck()}>Shuffle</button>
    <h2>Click to deal!</h2>
    <button type="button" onClick={() => dealHands(deck)}>Deal</button>
    <Player selectPlayer={selectPlayer}>
      <Hand playerNum={playerNum} key={hands[playerNum].toString()}>
        {hands[playerNum].map(card => (
          <span key={card}>
            <Card cardKey={card} />
            &nbsp;
          </span>
        ))}
      </Hand>
    </Player>
  </div>
);

Board.propTypes = {
  dealHands: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  remoteShuffleDeck: PropTypes.func.isRequired,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deck: PropTypes.arrayOf(PropTypes.string).isRequired,
  hands: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  playerNum: PropTypes.number.isRequired,
};

export default Board;
