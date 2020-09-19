import React from 'react';
import PropTypes from 'prop-types';
import Hand from './Hand';

const getPlayerPos = (playerIndex, mainPlayerIndex) => {
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

const Player = ({
  playerIndex, mainPlayerIndex, activeGame, user,
}) => {
  const className = `player ${getPlayerPos(playerIndex, mainPlayerIndex)}`;
  const isMyTurn = activeGame.playersTurn.uid === user.uid;
  const boldenName = isMyTurn
    && (activeGame.phase === 'bid'
    || activeGame.phase === 'play card'
    || activeGame.phase === 'wait');
  const winningBid = activeGame.currentBid
    && activeGame.currentBid.bid > 0
    && activeGame.currentBid.player.uid === user.uid;
  const isDealer = activeGame.dealer && activeGame.dealer.uid === user.uid;

  return (
    <div className={className}>
      {winningBid && activeGame.phase === 'bid'
        ? (
          <p className="winning-bid">
            Winning bid with:
            {activeGame.currentBid.bid}
          </p>
        )
        : <p className="winning-bid" />
      }
      <p className={boldenName ? 'player-name big-n-bold' : 'player-name'}>{`${user.displayName} ${isDealer ? '[Dealer]' : ''}`}</p>
      { activeGame.users[playerIndex].hand && activeGame.users[playerIndex].hand.length > 0
        ? (
          <Hand
            playerIndex={playerIndex}
            isPlayer={mainPlayerIndex === playerIndex}
            activeGame={activeGame}
          />
        )
        : <div />
      }

    </div>
  );
};

Player.propTypes = {
  playerIndex: PropTypes.number.isRequired,
  mainPlayerIndex: PropTypes.number.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  activeGame: PropTypes.shape({
    playersTurn: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
    }),
    currentBid: PropTypes.shape({
      bid: PropTypes.number,
      player: PropTypes.shape({
        uid: PropTypes.string,
      }),
    }),
    dealer: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
    }),
    users: PropTypes.array,
    phase: PropTypes.string,
  }).isRequired,
};

export default Player;
